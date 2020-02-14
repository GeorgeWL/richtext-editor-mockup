import React from 'react';
import { ITag } from '../interfaces/tagInterfaces';
interface ITagItem {
  tag: ITag;
  onClick: (data: ITag) => void;
}
const TagItem = ({ tag, onClick }: ITagItem) => {
  function handleClick() {
    onClick(tag);
  }
  return (
    <div style={{ backgroundColor: `rgb(${tag.color.r},${tag.color.g},${tag.color.b})` }}>
      {tag.tag}
      <button onClick={handleClick}>✖</button>
    </div>
  );
};

export default TagItem;
