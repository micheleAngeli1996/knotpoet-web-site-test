import {inject, Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {NewsItem} from '../models/News';
import {find, mergeMap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private firestoreService = inject(FirestoreService);

    getNews() {
        return this.firestoreService.getCollection<NewsItem>('news');
    }

    getNewsById(id: string) {
        return this.getNews().pipe(mergeMap(news => news), find(n => n.id === id));
    }
}
