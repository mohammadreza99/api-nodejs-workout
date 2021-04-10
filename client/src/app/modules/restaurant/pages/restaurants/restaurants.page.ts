import {Component, OnInit} from '@angular/core';
import {UtilsService} from '@ng/services';
import {NgColDef} from '@ng/models/table';
import {RestaurantService} from '@core/http';
import {switchMap} from 'rxjs/operators';
import {NgDialogFormConfig} from "@ng/models/overlay";

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

  getConfig(value?) {
    return [
      {type: 'hidden', formControlName: '_id', value: value?._id},
      {
        type: 'text',
        formControlName: 'name',
        label: 'عنوان',
        value: value?.name
      },
      {
        type: 'text',
        formControlName: 'description',
        label: 'توضیحات',
        value: value?.description
      }
    ] as NgDialogFormConfig[];
  }

  onAddRestaurant() {
    this.utilsService.showDialogForm('افزودن رستوران', this.getConfig()).onClose.pipe(switchMap((res) => {
      if (res) {
        return this.restaurantService.post(res);
      }
    })).subscribe(res => {
      this.rowData = [...this.rowData, res];
    });
  }

  onActionClick(event) {
    const rowData = event.rowData;
    switch (event.action) {
      case 'update':
        this.utilsService.showDialogForm('ویرایش رستوران', this.getConfig(rowData)).onClose.pipe(switchMap((res) => {
          if (res) {
            return this.restaurantService.put(res);
          }
        })).subscribe(res => {
          this.rowData[this.findIndex(rowData._id)] = res;
        });
        break;
      case 'delete':
        this.restaurantService.delete(rowData._id).subscribe((res) => {
          this.rowData.splice(this.findIndex(rowData._id), 1);
        });
    }
  }

  findIndex(id: any) {
    const item = this.rowData.find(r => r._id == id);
    return this.rowData.indexOf(item);
  }
}
