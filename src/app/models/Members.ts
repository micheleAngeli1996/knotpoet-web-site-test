import {IPerson} from './Person';

export interface Member extends IPerson {
  nickname: string,
  instrument: string,
  description: string,
  shortDescription: string,
  longDescription: string;
  order: number;
}
