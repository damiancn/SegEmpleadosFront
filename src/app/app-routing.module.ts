
import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';

export const routes: Routes = [
  { path: 'pages', loadChildren: () => import('./pages/routes').then(m => m.default), },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
