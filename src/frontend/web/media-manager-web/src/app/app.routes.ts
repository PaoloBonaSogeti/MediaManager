import { Routes } from '@angular/router';
import { MediaTypePage } from './pages/media-type-page/media-type-page';
import { MediaItemPage } from './pages/media-item-page/media-item-page';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'media-types' },
	{ path: 'media-types', component: MediaTypePage },
	{ path: 'media-items', component: MediaItemPage },
	{ path: '**', redirectTo: 'media-types' }
];
