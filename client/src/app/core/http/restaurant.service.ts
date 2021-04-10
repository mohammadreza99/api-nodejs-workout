import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';
import {Observable} from 'rxjs';

class User {
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService extends ApiService {
  private endpoint: string = 'restaurants';

  constructor() {
    super();
  }

  get(): Observable<any[]> {
    return this._get<User[]>(this.endpoint);
  }

  getById(id: number): Observable<User> {
    return this._get(this.endpoint + '/' + id);
  }

  post(restaurant): Observable<User> {
    return this._post(this.endpoint, restaurant);
  }

  put(restaurant) {
    return this._put(this.endpoint + '/' + restaurant._id, restaurant);
  }

  delete(id) {
    return this._delete(this.endpoint + '/' + id);
  }
}
