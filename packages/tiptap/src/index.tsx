import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { EditorContent, useEditor } from '@tiptap/react'

import { Paragraph } from './Paragraph'
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'

function App() {
  const editor = useEditor({
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: '1st' }]
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: '2nd' }]
        }
      ]
    },
    extensions: [Document, Paragraph, Text]
  })
  return <EditorContent editor={editor} />
}

const root = createRoot(document.getElementById('editor') as HTMLElement)
root.render(<App />)
