import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: 'home',
        data: {title: 'داشبورد'},
        loadChildren: (): Promise<any> =>
          import('./home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'restaurants',
        data: {title: 'رستوران ها'},
        loadChildren: (): Promise<any> =>
          import('./restaurant/restaurant.module').then((m) => m.RestaurantModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
