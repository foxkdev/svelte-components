<script>
import { menuOpened } from '../../stores/menu'
  import Menu from './Menu.svelte';
  export let position = 'bottom-right'

  const positions = {
    bottom: 'mt-2 left-0',
    'bottom-right': 'mt-2 right-0',
    top: 'bottom-12 left-0',
    'top-right': 'bottom-12 right-0',
  }
</script>

<ul class="absolute w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg {positions[position]} {$menuOpened ? 'block': 'hidden'} {$$props.class ?? ''}">
  <slot />
</ul>
