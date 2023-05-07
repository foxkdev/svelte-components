<script>
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Pencil, ChevronDown } from '@steeze-ui/heroicons'
  
  import {Menu, MenuItems, MenuItem, MenuButton} from '../../../lib/components/menu';
  import {Transition} from '../../../lib/components/transition';
  import Prism from 'svelte-prism'
</script>
<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-twilight.min.css" integrity="sha512-6rkEt5SymQMcnlRz1dHwAMSfMnDaFX28qdr3wyaa+XRCR8dTSWE4U6vjiTVuB6Mq9FgYOLVOTk0lrOeCnodcgA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>
<div class="flex flex-col space-y-6">
  <div>
    <h1 class="text-white text-4xl font-bold">Menu (Dropdown)</h1>
    <div class="text-gray-400 mt-4 mb-9.5">
      <p class="text-lg">
        Menus offer an easy way to build custom, accessible dropdown components.
      </p>
    </div>
  </div>

  <div>
    <h1 class="text-white text-2xl font-bold">Basic Example</h1>
    <div class="text-gray-400 mt-4 mb-9.5 font-medium">
      <p class="text-base ">
        Menu Buttons are built using the <span class="text-white font-semibold">Menu, MenuButton, MenuItems, and MenuItem</span> components.
      </p>
      <p class="text-base mt-6">
        The <span class="text-white font-semibold">MenuButton</span> will automatically open/close the <span class="text-white font-semibold">MenuItems</span> when clicked, and when the menu is open, the list of items receives focus.
      </p>
    </div>

    <Prism language="html">
      {`
        <header>
          <h1>Hello World!</h1>
        </header>
      `}
  </Prism>
  </div>
</div>

<style>
  pre[class*="language-"]{
    background-color: red !important;
  }
</style>
