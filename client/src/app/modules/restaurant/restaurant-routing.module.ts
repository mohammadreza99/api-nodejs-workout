import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsPage } from '@modules/restaurant/pages/restaurants/restaurants.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
