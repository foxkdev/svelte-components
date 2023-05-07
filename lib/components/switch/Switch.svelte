<script >
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()


  export let checked = false
  export let disabled = false
  export let name = ''


  const onChange = (e) => {
    checked = e.target.checked
    dispatch('change', e.target.checked)
  }
</script>

<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value={checked} {name} {checked} {disabled} class="sr-only peer" on:change={onChange} />
  <div
    class="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-focus:ring-teal-800 peer-checked:bg-teal-600 bg-teal-900"
  />
</label>
