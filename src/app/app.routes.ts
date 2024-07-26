import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin/pages/admin-page/admin-page.component';
import { LoginPageComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './core/pages/404/404.component';
import { SearchResultsComponent } from './youtube/components/search/search-results/search-results.component';
import { DetailedPageComponent } from './youtube/pages/detailed-page/detailed-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: SearchResultsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/:id',
    component: DetailedPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: PageNotFoundComponent },
];
