<script lang="ts">
  import type { Node as PMNode } from 'prosemirror-model'
  import type { EditorView } from 'prosemirror-view'

  export let node: PMNode,
    view: EditorView,
    getPos: () => number | undefined,
    contentDOM: (node: HTMLElement) => void

  let name = node.attrs.name || ''
  let editing = false
  let inputEl: HTMLInputElement

  function handleNameKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const pos = getPos()
      if (pos !== undefined && e.currentTarget instanceof HTMLInputElement) {
        const tr = view.state.tr
        tr.setNodeAttribute(pos, 'name', e.currentTarget.value)
        view.dispatch(tr)
      }
      editing = !editing
    } else if (e.key === 'Escape') {
      if (e.currentTarget instanceof HTMLInputElement) {
        e.currentTarget.value = ''
      }
      editing = !editing
    }
    e.stopPropagation()
  }
  function handleNameClick() {
    editing = true
    setTimeout(() => {
      inputEl.focus()
    })
  }
</script>

<div class="name" contenteditable="false">
  <input class:hidden={!editing} value={name} bind:this={inputEl} on:keydown={handleNameKeyDown} />
  <button class:hidden={editing} on:click={handleNameClick}>
    {node.attrs.name || 'Set name'}
  </button>
</div>
<div use:contentDOM></div>
