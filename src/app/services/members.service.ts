import {inject, Injectable} from '@angular/core';
import {IMember} from '../models/Members';
import {FirestoreService} from './firestore.service';
import {News} from '../models/News';
import {filter, find, map, mergeMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private firestoreService = inject(FirestoreService);

  getMembers() {
    return this.firestoreService.getCollection<IMember>('members').pipe(map(members => members.sort((a, b) => a.order - b.order)));
  }

  getMember(memberId: string) {
    return this.getMembers().pipe(mergeMap(members => members), find(m => m.id === memberId));
  }
}
