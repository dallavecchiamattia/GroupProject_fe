import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { MovimentoDetailComponent } from './pages/movimento-detail/movimento-detail.component';
import { ProfiloComponent } from './pages/profilo/profilo.component';
import { ListaMovimentiComponent } from './pages/lista-movimenti/lista-movimenti.component';
import { authGuard } from './utils/auth.guard';
import { LandingPageComponent } from './pages/landingPage/landingPage.component';
import { RicaricaComponent } from './pages/ricarica/ricarica.component';
import { BonificoComponent } from './pages/bonifico/bonifico.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profilo',
    component: ProfiloComponent,
    canActivate: [authGuard]
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
    path: 'ricarica',
    component: RicaricaComponent
  },
  {
    path: 'bonifici',
    component: BonificoComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];