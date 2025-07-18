import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home').then(c => c.Home) },
    { path: 'about', loadComponent: () => import('./pages/about/about').then(c => c.About) },
    { path: 'band/:id', loadComponent: () => import('./pages/band-member-detail/band-member-detail').then(c => c.BandMemberDetailComponent) },
    { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(c => c.Contact) },
    { path: 'news', loadComponent: () => import('./pages/news/news').then(c => c.News) },
    { path: 'news/:id', loadComponent: () => import('./pages/news-detail/news-detail.component').then(c => c.NewsDetailComponent) },
    { path: 'privacy', loadComponent: () => import('./pages/privacy-policy/privacy-policy').then(c => c.PrivacyPolicy) },
    { path: '**', loadComponent: () => import('./pages/page-not-found/page-not-found').then(c => c.PageNotFound) }
];
