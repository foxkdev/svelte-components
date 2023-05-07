<script>
import { menuOpened } from '../../stores/menu'
import { clickOutside } from '../../utils/clickOutside'

const handleOutside = () => {
  if($menuOpened) {
    menuOpened.set(false)
  }
}

const handleKeyDown = (event) => {
  if($menuOpened) {
    switch(event.key) {
      case 'Escape':
        menuOpened.set(false)
        break
      default:
        break
    }
  }
}

</script>
<div use:clickOutside on:click_outside={handleOutside} on:keydown={handleKeyDown} {...$$restProps} class="relative inline-block text-left">
  <slot isOpen={$menuOpened}></slot>
</div>