import React from 'react';
import classNames from 'class-names';
/* eslint-disable react/display-name */
const Menu = React.forwardRef(({ className, ...props }: any, ref: React.Ref<any>) => (
  <div {...props} ref={ref} className={classNames(className, 'editor__menu')} />
));
export default Menu;
