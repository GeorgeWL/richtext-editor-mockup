import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from './Editor';
import React from 'react';
import Button from '../Button';
import Icon from '../Icon';
interface IProps {
  format: string;
  icon?: string;
}
const MarkButton = ({ format, icon = '' }: IProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onClick={() => {
        toggleMark(editor, format);
      }}
    >
      <Icon name={icon} />
      <strong>{format}</strong>
    </Button>
  );
};
export default MarkButton;
