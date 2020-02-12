/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import * as React from 'react';
import './editor.scss';
import { useParams } from 'react-router-dom';
import { withReact, Slate, Editable, useSlate } from 'slate-react';
import { createEditor, Transforms, Editor } from 'slate';
import classNames from 'class-names';
import isHotkey from 'is-hotkey';
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
};
const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const TextEditor = () => {
  const { id } = useParams();
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = React.useState(initialValue);
  const renderElement = React.useCallback(props => <Element {...props} />, []);
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, []);
  const content = JSON.stringify(value);
  localStorage.setItem('content', content);
  return (
    <div className="editor">
      <h2>{id && <>post id: {id}</>}</h2>
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          className="editor__editable"
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
            const content = JSON.stringify(value);
            localStorage.setItem('content', content);
          }}
        />
      </Slate>
      <button
        className="editor__button"
        onClick={event => {
          event.preventDefault();
          const content = localStorage.getItem('content');
          console.log('content', JSON.parse(content));
        }}
      >
        Save
      </button>
    </div>
  );
};
export default TextEditor;
const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'code':
      return <CodeElement {...attributes}>{children}</CodeElement>;
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Icon = ({ name }) => <>{name}</>;
const Button = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={classNames('editor__button', active && 'editor__button-active')}
  >
    {children}
  </button>
);
const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onClick={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon name={icon}></Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onClick={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon name={icon}></Icon>
    </Button>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text "
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:'
      }
    ]
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }]
  }
];
const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={classNames(className, 'editor__menu')} />
));
const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu {...props} ref={ref} className={classNames(className, 'editor__toolbar')} />
));
