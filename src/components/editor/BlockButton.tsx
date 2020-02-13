import React from 'react';
import Button from '../Button';
import { toggleBlock, isBlockActive } from './RichTextEditor';
import { useSlate } from 'slate-react';
import Icon from '../Icon';
interface IProps {
  format: string;
  icon: string;
}
const BlockButton = ({ format, icon }: IProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onClick={() => {
        toggleBlock(editor, format);
      }}
    >
      <Icon name={icon}></Icon>
    </Button>
  );
};
export default BlockButton;
