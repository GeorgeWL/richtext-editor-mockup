import { ITag } from '../interfaces/tagInterfaces';
import { stringToTagObject } from './stringToTagObject';

export const stringToTagArray = (str: string): ITag[] =>
  str.split(',').map(val => stringToTagObject(val));
