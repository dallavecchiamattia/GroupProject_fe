import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { MovimentoDetailComponent } from './pages/movimento-detail/movimento-detail.component';
import { ProfiloComponent } from './pages/profilo/profilo.component';
import { ListaMovimentiComponent } from './pages/lista-movimenti/lista-movimenti.component';
import { authGuard } from './utils/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profilo',
    component: ProfiloComponent,
    //canActivate: [authGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'movimenti/:id',
    component: MovimentoDetailComponent
  },
  {
    path: 'movimenti',
    component: ListaMovimentiComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];