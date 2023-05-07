<script>
import { isActive } from '@roxi/routify'
import NavBar from '../components/NavBar.svelte';
import Menu from '../assets/sidebar/menu.svg';
import Switch from '../assets/sidebar/switch.svg';
import Transition from '../assets/sidebar/transition.svg';

const components = [
  {
    label: 'Introduction',
    path: '/introduction',
    icon: null
  },
  {
    label: 'Menu (Dropdown)',
    path: '/menu',
    icon: Menu
  },
  {
    label: 'Switch (Toggle)',
    path: '/switch',
    icon: Switch
  },
  {
    label: 'Transition',
    path: '/transition',
    icon: Transition
  }
]
</script>
<!-- routify:meta reset -->
<div class="font-sans antialiased bg-gray-900">
  <NavBar />
  <div class="bg-gray-900 mt-10">
    <div class="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="hidden w-64 shrink-0 lg:block lg:pr-8">
        <div class="sticky top-[120px]">
          <nav class="mx-auto space-y-4 text-gray-400">
            {#each components as component}
              <a class="flex items-center whitespace-nowrap rounded py-2 px-6 font-medium transition-colors duration-200 hover:text-white lg:py-0 lg:px-0 lg:text-sm text-gray-400 {$isActive(component.path) ? 'text-white' : ''} " href={component.path}>
                {#if component.icon}
                <img src={component.icon} class="mr-3 h-6 w-6 shrink-0">
                {/if}
                {component.label}
              </a>
            {/each}
          </nav>
        </div>
      </div>
      <main class="flex min-w-0 flex-1">
        <slot />
      </main>
    </div>
  </div>
</div>