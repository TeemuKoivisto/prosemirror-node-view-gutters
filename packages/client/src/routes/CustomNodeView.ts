import { DOMSerializer, type Node as PMNode } from 'prosemirror-model'
import type {
  Decoration,
  DecorationSource,
  EditorView,
  NodeView,
  NodeViewConstructor
} from 'prosemirror-view'

export class CustomNodeView implements NodeView {
  protected _dom?: HTMLElement
  contentDOM?: HTMLElement

  node: PMNode
  decorations: readonly Decoration[]
  innerDecorations: DecorationSource

  constructor(
    node: PMNode,
    readonly view: EditorView,
    readonly getPos: () => number | undefined,
    decorations: readonly Decoration[],
    innerDecorations: DecorationSource
  ) {
    this.node = node
    this.view = view
    this.decorations = decorations
    this.innerDecorations = innerDecorations
  }

  get dom() {
    if (!this._dom) {
      throw Error('Accessing uninitialized dom!')
    }
    return this._dom
  }

  init = (): this => {
    const toDOM = this.node.type.spec.toDOM
    if (!toDOM) throw Error(`node "${this.node.type}" was not given a toDOM method!`)
    const { dom, contentDOM } = DOMSerializer.renderSpec(document, toDOM(this.node))
    this.contentDOM = contentDOM
    this._dom = document.createElement(this.node.type.spec.inline ? 'span' : 'div')
    this._dom.classList.add('block')
    this._dom.appendChild(this.createGutter())
    if (contentDOM) {
      this._dom.appendChild(contentDOM)
    }
    this._dom.appendChild(this.createGutter())
    return this
  }

  createGutter(): HTMLElement {
    const gutter = document.createElement('div')
    gutter.setAttribute('contenteditable', 'false')
    gutter.classList.add('gutter')
    return gutter
  }

  update = (
    node: PMNode,
    decorations: readonly Decoration[],
    innerDecorations: DecorationSource
  ): boolean => {
    console.log('update')
    if (node.type.name !== this.node.type.name) {
      return false
    }
    this.node = node
    this.decorations = decorations
    this.innerDecorations = innerDecorations
    return true
  }

  selectNode = () => {
    console.log('selectNode ')
  }

  deselectNode = () => {
    console.log('deselectNode ')
  }

  ignoreMutation = (mutation: MutationRecord) => {
    console.log('mutation', mutation)
    return false
  }

  static fromComponent(): NodeViewConstructor {
    return (
      node: PMNode,
      view: EditorView,
      getPos: () => number | undefined,
      decorations: readonly Decoration[],
      innerDecorations: DecorationSource
    ) => new this(node, view, getPos, decorations, innerDecorations).init()
  }
}
