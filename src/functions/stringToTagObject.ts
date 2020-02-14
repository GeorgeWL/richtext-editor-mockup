import { ITag, IColorRedGreenBlue } from '../interfaces/tagInterfaces';
import uuid from 'uuid';

export function stringToTagObject(str: string): ITag {
  return {
    id: uuid(),
    tag: str.trim(),
    color: randomColor()
  };
}

export function randomColor(): IColorRedGreenBlue {
  const r = colorGen();
  const g = colorGen();
  const b = colorGen();
  return { r, g, b };
}

export const colorGen = () => Math.floor(Math.random() * 255);
