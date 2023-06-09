<script>
	import { getContext, setContext, createEventDispatcher, tick } from 'svelte'
	import { writable } from 'svelte/store'

	// state of element (shown or hidden), if null this we are treated as a child
	// transition and will get the state from our parent, coordinating with it
	export let show = null

	// apply transition when element is first rendered (i.e. animate in)
	export let appear = false

	// whether the element should be removed from the DOM (vs hidden)
	export let unmount = false

	// classes to apply when entering (showing)
	export let enter = ''
	export let enterFrom = ''
	export let enterTo = ''

	// classes toi apply when leaving (hiding)
	export let leave = null
	export let leaveFrom = null
	export let leaveTo = null

  const key = {}
  // convert a string of class names into an array, for use with DOM methods
	function classes(classes) {
		return classes ? classes.split(' ').filter(x => x) : []
	}

	// to wait until css changes have been appplied we use a double rAF
	function nextFrame() {
		const raf = requestAnimationFrame // help minification
		return new Promise(resolve => raf(() => raf(resolve)))
	}

	// convert class strings to arrays, for easier use with DOM elements
	$: enterClasses = classes(enter)
	$: enterFromClasses = classes(enterFrom)
	$: enterToClasses = classes(enterTo)

	// if leave, leaveFrom, or leaveTo are not specified then use enter values
	// as a convenient way to avoid repeating definitions (but reverse To & From)
	$: leaveClasses = classes(leave === null ? enter : leave)
	$: leaveFromClasses = classes(leaveFrom === null ? enterTo : leaveFrom)
	$: leaveToClasses = classes(leaveTo === null ? enterFrom : leaveTo)

	// get parent context if we're a child
	const parent = show === null ? getContext(key) : null

	// create our own context (which will also become parent for any children)
	// we keep the writable part (using set) and give a readable store to them
	const { subscribe, set } = writable(show)

	const context = {
		appear: parent ? parent.appear : appear,
		count: 0,
		show: { subscribe },
		completed: () => {},
	}

	// initial state
	let display = show && !context.appear ? 'contents' : 'none'
	let mounted = !unmount || show === true

	// set context for children to use
	setContext(key, context)

	const dispatch = createEventDispatcher()

	// use action that hooks into our wrapper div and manages everything
	function transition(node, show) {
		// the child element that we will be applying classes to
		// let el = node.firstElementChild as HTMLElement

		let el
		function addClasses(...classes) {
			el.classList.add(...classes)
		}

		function removeClasses(...classes) {
			el.classList.remove(...classes)
		}

		function transitionEnd(transitions) {
			// return a promise that transitions are complete (resolve immediately if no transitions)
			return transitions.length
				? new Promise(resolve =>
						el.addEventListener('transitionend', e => {
							e.stopPropagation()
							resolve()
						}, { once: true })
				  )
				: Promise.resolve()
		}

		function childrenCompleted(parentCompleted) {
			// return a promise that all children have completed (resolve immediately if no children)
			// sets the context completed method that children call to a promise that the parent has completed
			return context.count
				? new Promise(resolve => {
						let count = 0
						context.completed = () => {
							if (++count === context.count) {
								resolve()
							}
							return parentCompleted
						}
				  })
				: Promise.resolve()
		}

		async function apply(show, base, from, to) {
			el = await ensureMountedElement()

			let resolveCompleted = () => {}
			const completed = new Promise(resolve => {
				resolveCompleted = resolve
			})

			const children = childrenCompleted(completed)

			// set state for any child transitions
			set(show)

			addClasses(...base, ...from)

			const transitioned = transitionEnd(base)

			await nextFrame()

			removeClasses(...from)
			addClasses(...to)

			await Promise.all([transitioned, children])

			if (parent) {
				await parent.completed()
			}

			removeClasses(...base, ...to)

			resolveCompleted()
		}

		async function ensureMountedElement() {
			if (unmount && !mounted) {
				mounted = true
				await tick() // give slot chance to render
			}
			return node.firstElementChild
		}

		async function enter() {
			dispatch('before-enter')

			display = 'contents'

			await apply(true, enterClasses, enterFromClasses, enterToClasses)

			dispatch('after-enter')
		}

		async function leave() {
			dispatch('before-leave')

			await apply(false, leaveClasses, leaveFromClasses, leaveToClasses)

			display = 'none'

			if (unmount) {
				mounted = false
			}

			dispatch('after-leave')
		}

		// execute is always called, even for the initial render, so we use a flag
		// to prevent a transition running unless appear is set for animating in
		let run = context.appear

		function execute(show) {
			// run appropriate transition, set promise for completion
			executing = run
				? show
					? enter()
					: leave()
				: Promise.resolve()

			// play transitions on all subsequent calls ...
			run = true
		}

		// to unsubscribe from parent when we're destroyed (if we're a child)
		let unsubscribe

		// to wait for in-progress transitions to complete
		let executing

		// if we're a child transition, increment the count on the parent and listen for state notifications
		if (parent) {
			parent.count++
			// child updates happen here, as show propery is updated by the parent, which triggers the transition
			unsubscribe = parent.show.subscribe(execute)
		} else {
			// otherwise, first run through to set initial state (and possibly, 'appear' transition)
			execute(show)
		}

		return {
			update(show) {
				// top-level updates happen here, as show property is updated, which triggers the transition
				// wait for current transition to complete so state is consistent (may be state waiting on our events)
				executing.then(() => execute(show))
			},
			destroy() {
				// if we're a child and being removed, notify our parent and stop listening for updates
				if (parent) {
					unsubscribe()
					parent.count--
				}
			},
		}
	}
</script>

<div style:display use:transition={show}>{#if mounted}<slot />{/if}</div>