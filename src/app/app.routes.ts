import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'catalogo', component: CatalogComponent },
	{ path: '**', redirectTo: '' },
];
