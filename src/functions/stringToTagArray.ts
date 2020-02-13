import { ITag } from '../interfaces/tagInterfaces';

export const stringToTagArray = (tag: string): ITag => {
  return { tag, color: 'red' };
};
