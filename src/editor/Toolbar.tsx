import React from 'react';
import Menu from './Menu';
import classNames from 'class-names';
// eslint-disable-next-line react/display-name
const Toolbar = React.forwardRef(({ className, ...props }: any, ref: React.Ref<any>) => (
  <Menu {...props} ref={ref} className={classNames(className, 'editor__toolbar')} />
));
export default Toolbar;
