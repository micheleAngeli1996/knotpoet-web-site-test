import {inject, Injectable} from '@angular/core';
import {Member} from '../models/Members';
import {FirestoreService} from './firestore.service';
import {find, map, mergeMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private firestoreService = inject(FirestoreService);

  getMembers() {
    return this.firestoreService.getCollection<Member>('members').pipe(map(members => members.sort((a, b) => a.order - b.order)));
  }

  getMember(memberId: string) {
    return this.getMembers().pipe(mergeMap(members => members), find(m => m.id === memberId));
  }
}
