import { inject, Injectable } from "@angular/core"
import { find, mergeMap, Observable, of } from 'rxjs';
import { FirestoreService } from './firestore.service';

export interface BandMember {
  id: string
  idName: string
  name: string
  role: string
  roleIcon: string
  shortDescription: string
  longDescription: string
  image: string
  imageAlt: string
  birthDate?: string
  birthPlace?: string
  yearsActive: string
  influences: string[]
  equipment?: string[]
  socialMedia?: {
    instagram?: string
    twitter?: string
  }
}

@Injectable({
  providedIn: "root",
})
export class BandMembersService {
  private firestoreService = inject(FirestoreService);

  getAllMembers(): Observable<BandMember[]> {
    return this.firestoreService.getCollection('members');
  }

  getMember(id: string): Observable<BandMember | undefined >{
    return this.getAllMembers().pipe(mergeMap(members => members), find(m => m.id === id));
  }
}
