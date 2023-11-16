import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresadoGuard } from './no-ingresado-guard.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'loading',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomePageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then( m => m.LoginPageModule),canActivate :[NoIngresadoGuard]
  },
  {
    path: 'recover-password-modal',
    loadChildren: () => import('./modules/recover-password-modal/recover-password-modal.module').then( m => m.RecoverPasswordModalPageModule),canActivate :[NoIngresadoGuard]
  },
  {
    path: 'loading',
    loadChildren: () => import('./modules/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then( m => m.RegisterPageModule),canActivate :[NoIngresadoGuard]
  },
  
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
   
    path: '**',
        redirectTo: 'not-found', // Redirige cualquier ruta que no coincida a la página de error 404.
      },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
