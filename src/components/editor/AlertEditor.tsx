import React, { useState } from 'react';
import './alertEditor.scss';
import Button from '../Button';
import TagListInput from '../TagListInput';
interface IProps {
  onSave: (data: object) => void;
}
const AlertEditor = ({ onSave }: IProps) => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  // const [tags, setTags] = useState([]);
  function handleSave() {
    onSave({ title, value });
  }
  return (
    <div className="alertEditor">
      <div className="alertEditor__titleInput">
        <label htmlFor="alertTitle" className="alertEditor__titleInput__label">
          Alert Title
        </label>
        <input
          id="alertTitle"
          className="alertEditor__titleInput__input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Set Alert Title"
          maxLength={50}
        />
      </div>
      <textarea
        className="alertEditor__editable"
        name=""
        id=""
        placeholder="Set Alert Main Text"
        cols={30}
        rows={3}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div>
        <label htmlFor="tagList">
          Set Tags{' '}
          <small>
            comma-seperated values e.g. <pre>tag, other tag, new tag</pre>
          </small>
        </label>
        <TagListInput />
      </div>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default AlertEditor;
