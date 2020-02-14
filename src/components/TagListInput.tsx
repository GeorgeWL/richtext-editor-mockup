import React, { useState } from 'react';
import { ITag } from '../interfaces/tagInterfaces';
import TagItem from './TagItem';
import { stringToTagObject } from '../functions/stringToTagObject';

const TagListInput = () => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [value, setValue] = useState<string>('');
  function handleValue(str: string) {
    const values = str.split(',');
    const singleValue = values[0];
    if (values.length > 1) {
      addTags(values);
    }
    if (str.endsWith(',')) {
      setValue('');
    } else {
      setValue(singleValue);
    }
  }
  // FIX: This whole thing feels messy

  function addTags(values: string[]) {
    setTags(prevState => {
      const newTags = values.filter(val => val.length > 0).map(val => stringToTagObject(val));
      newTags.forEach(newTag => prevState.push(newTag));
      return prevState;
    });
  }
  function removeTag(tag: ITag) {
    setTags(prevState => prevState.filter(currentTag => tag.id !== currentTag.id));
  }
  return (
    <>
      <input value={value} onChange={e => handleValue(e.target.value)} />
      {tags.map((tag: ITag) => (
        <TagItem key={tag.id} tag={tag} onClick={removeTag} />
      ))}
    </>
  );
};
export default TagListInput;
