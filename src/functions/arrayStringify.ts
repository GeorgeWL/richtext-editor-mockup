import { ITag } from '../interfaces/tagInterfaces';

export const stringFromTagArray = (arr: ITag[]): string => arr.map(tag => tag.tag).join();
