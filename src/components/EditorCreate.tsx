import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import RichTextEditor from './editor/RichTextEditor';
function parseUrlHeader(url: string): string {
  const isPost = /\/posts(\/{1}.*)*/.test(url);
  const isAlert = /\/alerts(\/{1}.*)*/.test(url);
  let header = '';
  if (isPost) {
    header = 'Posts';
  }
  if (isAlert) {
    header = 'Alerts';
  }
  return header;
}
const EditorCreate: React.SFC = () => {
  const { url } = useRouteMatch();
  return (
    <div>
      <h1>Edit {parseUrlHeader(url)}</h1>
      <RichTextEditor></RichTextEditor>
    </div>
  );
};
export default EditorCreate;
