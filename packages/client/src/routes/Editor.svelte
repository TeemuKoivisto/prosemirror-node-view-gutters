<script lang="ts">
  import { onDestroy } from 'svelte'
  import { EditorState } from 'prosemirror-state'
  import { EditorView } from 'prosemirror-view'
  import { buildKeymap, buildInputRules } from 'prosemirror-example-setup'
  import { keymap } from 'prosemirror-keymap'
  import { history } from 'prosemirror-history'
  import { baseKeymap } from 'prosemirror-commands'

  import { schema } from './schema'
  import { CustomNodeView } from './CustomNodeView'

  let view: EditorView | undefined

  onDestroy(() => {
    view?.destroy()
  })

  function editor_action(dom: HTMLElement) {
    const state = EditorState.create({
      schema,
      plugins: [
        // buildInputRules(schema),
        // keymap(buildKeymap(schema)),
        keymap(baseKeymap),
        history()
      ]
    })
    view = new EditorView(
      { mount: dom },
      {
        state,
        nodeViews: {
          paragraph: CustomNodeView.fromComponent()
        }
      }
    )
  }
</script>

<div class="w-full flex justify-center items-center rounded">
  <div use:editor_action />
</div>

<style lang="scss" global>
  .ProseMirror {
    border-top: 0;
    font-family: 'Quattrocento', serif;
    max-width: 50rem;
    min-height: 140px;
    overflow-wrap: break-word;
    outline: none;
    white-space: pre-wrap;
    width: 100%;
    @apply py-4 bg-gray-200;

    .block {
      display: grid;
      grid-template-columns: 64px auto 56px;
      position: relative;
    }
  }
</style>
