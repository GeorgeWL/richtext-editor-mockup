import React, { useState } from 'react';
import { ITag } from '../interfaces/tagInterfaces';
import { stringToTagArray } from '../functions/stringToTagArray';

const TagListInput = () => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [value, setValue] = useState<string>('');
  function handleValue(str: string) {
    if (str.endsWith(',')) {
      setTags(prevState => {
        prevState.push(stringToTagArray(value));
        return prevState;
      });
      setValue('');
    } else {
      setValue(str);
    }
  }
  return (
    <>
      <input value={value} onChange={e => handleValue(e.target.value)} />
      {tags.map((tag: ITag) => (
        <span style={{ backgroundColor: tag.color }}></span>
      ))}
    </>
  );
};
export default TagListInput;
