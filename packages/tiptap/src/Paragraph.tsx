import * as React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Paragraph as BaseParagraph } from '@tiptap/extension-paragraph'
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'

const ParagraphComponent = ({ editor, node }: NodeViewProps) => {
  return (
    <NodeViewWrapper className="paragraph-wrapper">
      <div className="name">
        <button>{node.attrs.name || 'Set name'}</button>
      </div>
      <NodeViewContent as="aside" />
    </NodeViewWrapper>
  )
}

export const Paragraph = BaseParagraph.extend({
  addAttributes() {
    return {
      name: {
        default: null
      }
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(ParagraphComponent)
  }
})
