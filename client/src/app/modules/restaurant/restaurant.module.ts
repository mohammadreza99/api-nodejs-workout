import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';
import { CoreModule } from '@core/core.module';
import { RestaurantRoutingModule } from '@modules/restaurant/restaurant-routing.module';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [RestaurantRoutingModule, SharedModule, CoreModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantModule {
}
