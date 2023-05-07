

export default {
  "meta": {
    "reset": true
  },
  "id": "_default",
  "_regex": {},
  "_paramKeys": {},
  "file": {
    "path": "src/routes/_module.svelte",
    "dir": "src/routes",
    "base": "_module.svelte",
    "ext": ".svelte",
    "name": "_module"
  },
  "asyncModule": () => import('../src/routes/_module.svelte'),
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {},
      "id": "_default_index_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "index",
      "file": {
        "path": "src/routes/index.svelte",
        "dir": "src/routes",
        "base": "index.svelte",
        "ext": ".svelte",
        "name": "index"
      },
      "asyncModule": () => import('../src/routes/index.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_introduction_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "introduction",
      "file": {
        "path": "src/routes/introduction.svelte",
        "dir": "src/routes",
        "base": "introduction.svelte",
        "ext": ".svelte",
        "name": "introduction"
      },
      "asyncModule": () => import('../src/routes/introduction.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_menu_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "menu",
      "file": {
        "path": "src/routes/menu.svelte",
        "dir": "src/routes",
        "base": "menu.svelte",
        "ext": ".svelte",
        "name": "menu"
      },
      "asyncModule": () => import('../src/routes/menu.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_switch_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "switch",
      "file": {
        "path": "src/routes/switch.svelte",
        "dir": "src/routes",
        "base": "switch.svelte",
        "ext": ".svelte",
        "name": "switch"
      },
      "asyncModule": () => import('../src/routes/switch.svelte'),
      "children": []
    },
    {
      "meta": {
        "dynamic": true,
        "dynamicSpread": true
      },
      "_regex": {},
      "_paramKeys": {},
      "name": "[...404]",
      "file": {
        "path": ".routify/components/[...404].svelte",
        "dir": ".routify/components",
        "base": "[...404].svelte",
        "ext": ".svelte",
        "name": "[...404]"
      },
      "asyncModule": () => import('./components/[...404].svelte'),
      "children": []
    }
  ]
}