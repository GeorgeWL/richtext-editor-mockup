import React from 'react';
interface IProps {
  name: string;
  size?: string;
}
const Icon = ({ name }: IProps) => <>{name}</>;
export default Icon;
