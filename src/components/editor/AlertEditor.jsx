/* eslint-disable react/prop-types */
import React, { useState, useCallback, useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Node, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import RichTextToolBar from './RichTextToolbar';

const withLayout = editor => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length < 1) {
        const paragraph = { type: 'paragraph', children: [{ text: '' }] };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(1) });
      }

      for (const [child, childPath] of Node.children(editor, path)) {
        const type = 'paragraph';

        if (child.type !== type) {
          Transforms.setNodes(editor, { type }, { at: childPath });
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

const AlertEditor = () => {
  const [value, setValue] = useState(initialValue);
  const [title, setTitle] = useState('');
  const renderElement = useCallback(props => <Element {...props} />, []);
  const editor = useMemo(() => withLayout(withHistory(withReact(createEditor()))), []);
  return (
    <div>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Set Alert Title"
        maxLength={50}
      />
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <RichTextToolBar />
        <Editable renderElement={renderElement} placeholder="Enter an alert" spellCheck autoFocus />
      </Slate>
    </div>
  );
};

const Element = ({ attributes, children }) => <p {...attributes}>{children}</p>;

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          'This example shows how to enforce your layout with domain-specific constraints. This document will always have a least one paragraph in the body. Try deleting them and see what happens!'
      }
    ]
  }
];

export default AlertEditor;
