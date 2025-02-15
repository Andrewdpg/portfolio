import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Swal from 'sweetalert2'

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Code2,
} from 'lucide-react'
import { Button } from './Button'
import { ResponsiveContainer } from './ResponsiveContainer'

type RichTextEditorProps = {
  value: string
  onChange: (content: string) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link,
      Image,
    ],
    content: '',
  })

  const addLink = async () => {
    const { value: url } = await Swal.fire({
      title: 'Enter the URL',
      input: 'text',
      inputPlaceholder: 'https://example.com',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
    })

    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
  }

  const addImage = async () => {
    const { value: url } = await Swal.fire({
      title: 'Enter the URL',
      input: 'text',
      inputPlaceholder: 'https://example.com',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
    })

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="relative border rounded-md bg-app-white">
      <ResponsiveContainer className="py-1 px-2 border-b">
        <Button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="rounded-none"
          variant="option"
        >
          <Bold className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="rounded-none"
          variant="option"
        >
          <Italic className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className="rounded-none"
          variant="option"
        >
          <UnderlineIcon className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className="rounded-none"
          variant="option"
        >
          <Strikethrough className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className="rounded-none"
          variant="option"
        >
          <List className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className="rounded-none"
          variant="option"
        >
          <ListOrdered className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          className="rounded-none"
          variant="option"
        >
          <AlignLeft className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          className="rounded-none"
          variant="option"
        >
          <AlignCenter className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          className="rounded-none"
          variant="option"
        >
          <AlignRight className="w-5 h-5" />
        </Button>

        <Button onClick={addLink} variant="option" className="rounded-none">
          <LinkIcon className="w-5 h-5" />
        </Button>

        <Button onClick={addImage} variant="option" className="rounded-none">
          <ImageIcon className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className="rounded-none"
          variant="option"
        >
          <Code className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className="rounded-none"
          variant="option"
        >
          <Code2 className="w-5 h-5" />
        </Button>
      </ResponsiveContainer>
      <EditorContent
        editor={editor}
        className="min-h-[75px] p-2 focus:outline-none focus:ring-2 focus:ring-app-main"
      />
    </div>
  )
}

export default RichTextEditor
