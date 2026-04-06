import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CatalogDetailComponent } from './pages/catalog/catalog-detail.component';
import { PrivacyPolicyComponent } from './pages/legal/privacy-policy.component';
import { TermsAndConditionsComponent } from './pages/legal/terms-and-conditions.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'catalogo', component: CatalogComponent },
	{ path: 'catalogo/:slug', component: CatalogDetailComponent },
	{ path: 'aviso-de-privacidad', component: PrivacyPolicyComponent },
	{ path: 'terminos-y-condiciones', component: TermsAndConditionsComponent },
	{ path: '**', redirectTo: '' },
];
