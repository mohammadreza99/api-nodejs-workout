import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@ng/services';
import { NgColDef } from '@ng/models/table';
import { RestaurantService } from '@core/http';

@Component({
  selector: 'ng-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss']
})
export class RestaurantsPage implements OnInit {
  colDef: NgColDef[] = [
    {
      field: '_id',
      header: 'شناسه',
      renderer: {type: 'text'}
    }, {
      field: 'name',
      header: 'نام',
      renderer: {type: 'text'}
    }, {
      field: 'description',
      header: 'توضیحات',
      renderer: {type: 'text'}
    }
  ];
  rowData: any[];

  constructor(private utilsService: UtilsService, private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.rowData = await this.restaurantService.get().toPromise();
  }

  onAddRestaurant() {
    this.utilsService.showDialogForm('افزودن رستوران', [
      {
        type: 'text',
        formControlName: 'name'
      },
      {
        type: 'text',
        formControlName: 'description'
      }
    ]).onClose.subscribe(res => {
      if (res) {
        this.restaurantService.post(res).subscribe();
      }
    });
  }

  onActionClick(event) {
    const rowData = event.rowData;
    switch (event.action) {
      case 'update':
        this.utilsService.showDialogForm('ویرایش رستوران', [
          {type: 'hidden', formControlName: '_id', value: rowData._id},
          {
            type: 'text',
            formControlName: 'name',
            value: rowData.name
          },
          {
            type: 'text',
            formControlName: 'description',
            value: rowData.description
          }
        ]).onClose.subscribe(res => {
          if (res) {
            this.restaurantService.put(res).subscribe();
          }
        });
        break;
      case 'delete':
        this.restaurantService.delete(rowData._id).subscribe();
    }
  }
}
