<script>
import { menuOpened } from '../../stores/menu'

const toggleMenu = () => {
  menuOpened.update((v) => !v)
}

</script>


<button on:click={toggleMenu} class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white {$$props.class ?? ''}">
  <slot />
</button>