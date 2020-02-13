import React from 'react';
import classNames from 'class-names';
import './button.scss';
interface IProps {
  children: any;
  onClick: (val?: any) => void;
  active?: boolean;
  loading?: boolean;
  className?: string;
}
const Button = ({ children, onClick, active = false, loading = false, className }: IProps) => (
  <button
    onClick={onClick}
    className={classNames(className, 'btn', active && 'btn-active', loading && 'btn-loading')}
  >
    {children}
  </button>
);
export default Button;
