import React from 'react';
import classNames from 'class-names';
import './button.scss';
interface IProps {
  children: any;
  onClick: () => void;
  active: boolean;
  className?: string;
}
const Button = ({ children, onClick, active, className }: IProps) => (
  <button onClick={onClick} className={classNames(className, 'btn', active && 'btn-active')}>
    {children}
  </button>
);
export default Button;
