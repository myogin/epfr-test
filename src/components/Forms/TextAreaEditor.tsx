import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

const TextAreaEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // const [content, setcontent] = useState("")

  // let contentBlock = htmlToDraft(content)
  // let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)

  // let editorStateNew = EditorState.createWithContent(contentState)

  const handleChange = (state: EditorState) => {
    setEditorState(state);
  };

  return (
    <>
    <Editor
    toolbarClassName="toolbar-class"
    wrapperClassName="wrapper-class"
    editorClassName="editor-class"
    editorState={editorState} 
    onEditorStateChange={handleChange}
    toolbar={{
      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
      inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
      image: { 
        urlEnabled: true,
        uploadEnabled: true,
        previewImage: true,
        alt: { present: false, mandatory: false } 
      },
    }}
    />
    {/* <p>{JSON.stringify(editorState)}</p> */}
    </>
  );
};

export default TextAreaEditor;
