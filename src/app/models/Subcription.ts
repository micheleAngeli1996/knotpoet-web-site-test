import {Timestamp} from 'firebase/firestore';

export interface ISubscribeForm {
  name: string,
  email: string,
  phone: string,
  city: string,
  state: string,
  country: string,
  agreement: boolean
}

export interface ISubscriber {
  name: string,
  email: string,
  phone: string,
  city: string,
  state: string,
  country: string,
  agreement: boolean,
  subscribed: boolean,
  lang: string,
  timestamp: Timestamp,
  unsubscribeToken?: string,
  subscriptionToken?: string,
  id?: string
}
