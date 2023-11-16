import { EditorState } from 'prosemirror-state'
import { EditorView, NodeView } from 'prosemirror-view'
import { keymap } from 'prosemirror-keymap'
import { DOMSerializer, Node as PMNode, Schema } from 'prosemirror-model'
import { baseKeymap } from 'prosemirror-commands'

class CustomNodeView implements NodeView {
  dom?: HTMLElement
  contentDOM?: HTMLElement
  node: PMNode

  constructor(
    node: PMNode,
    readonly view: EditorView
  ) {
    this.node = node
    this.view = view

    const toDOM = this.node.type.spec.toDOM
    const { dom, contentDOM } = DOMSerializer.renderSpec(document, toDOM(this.node))
    this.contentDOM = contentDOM
    this.dom = document.createElement(this.node.type.spec.inline ? 'span' : 'div')
    this.dom.classList.add('block')
    this.dom.appendChild(this.createGutter())
    if (contentDOM) {
      this.dom.appendChild(contentDOM)
    }
    this.dom.appendChild(this.createGutter())
  }

  createGutter(): HTMLElement {
    const gutter = document.createElement('div')
    gutter.setAttribute('contenteditable', 'false')
    gutter.classList.add('gutter')
    return gutter
  }
}

const schema = new Schema({
  nodes: {
    doc: {
      content: 'block+'
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      selectable: false,
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0]
      }
    },
    text: {
      group: 'inline'
    }
  }
})

const state = EditorState.create({
  schema,
  plugins: [keymap(baseKeymap)]
})
const view = new EditorView(document.querySelector('#editor') as HTMLElement, {
  state,
  nodeViews: {
    paragraph: (n, v) => new CustomNodeView(n, v)
  }
})
