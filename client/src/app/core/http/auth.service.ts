import { Injectable } from '@angular/core';
import { ApiService } from '@core/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private endpoint: string = 'auth';

  constructor() {
    super();
  }

  login(data: object): any {
    return this._post(
      `${this.endpoint}/login`,
      data,
      {loading: false},
      false
    );
  }

  register(data: object): any {
    return this._post(
      `${this.endpoint}/register`,
      data,
      {loading: false},
      false
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
