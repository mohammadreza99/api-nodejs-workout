import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, PagesGuard } from '@core/guard';
import { NotFoundComponent } from '@ng/components/not-found/not-found.component';
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: (): Promise<Type<any>> =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    // canActivate: [PagesGuard],
  },
  {
    path: '',
    loadChildren: (): Promise<Type<any>> =>
      import('./modules/main.module').then((m) => m.MainModule),
    // canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
