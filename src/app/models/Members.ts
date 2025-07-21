import {IPerson} from './Person';

export interface IMember extends IPerson {
  nickname: string,
  instrument: string,
  description: string,
  shortDescription: string,
  longDescription: string;
  order: number;
}
