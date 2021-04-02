import {HttpClient, HttpParams} from '@angular/common/http';
import {Global} from '@ng/global';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

export class ApiService {
  private http: HttpClient;
  private baseUrl: string = environment.apiUrl;

  constructor() {
    this.http = Global.Injector.get(HttpClient);
  }

  protected _get<T>(
    endpoint: string,
    params: any = null,
    mapData: boolean = false
  ): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, {
        params: this.getHttpParams(params),
      })
      .pipe(
        map((res: any) => {
          return !mapData ? res : (res.data as T);
        })
      );
  }

  protected _post<T>(
    endpoint: string,
    data: any,
    params: any = null,
    mapData: boolean = false
  ): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, data, {
        params: this.getHttpParams(params),
      })
      .pipe(
        map((res: any) => {
          return !mapData ? res : (res.data as T);
        })
      );
  }

  protected _put<T>(
    endpoint: string,
    data: any,
    params: any = null,
    mapData: boolean = false
  ): Observable<T> {
    return this.http
      .put(`${this.baseUrl}/${endpoint}`, data, {
        params: this.getHttpParams(params),
      })
      .pipe(
        map((res: any) => {
          return !mapData ? res : (res.data as T);
        })
      );
  }

  protected _patch<T>(
    endpoint: string,
    data: any,
    params: any = null,
    mapData: boolean = false
  ): Observable<T> {
    return this.http
      .patch(`${this.baseUrl}/${endpoint}`, data, {
        params: this.getHttpParams(params),
      })
      .pipe(
        map((res: any) => {
          return !mapData ? res : (res.data as T);
        })
      );
  }

  protected _delete<T>(
    endpoint: string,
    params: any = null,
    mapData: boolean = false
  ): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, {
        params: this.getHttpParams(params),
      })
      .pipe(
        map((res: any) => {
          return !mapData ? res : (res.data as T);
        })
      );
  }

  protected getFormData(
    obj: any,
    excludes: string[] = [],
    editMode: boolean = false
  ): FormData {
    const formData = new FormData();
    for (const key in obj) {
      const value = obj[key];
      if (Array.isArray(value)) {
        // typeof Array
        for (let i = 0; i < value.length; i++) {
          formData.append(key + '[' + i + ']', value[i]);
        }
      } else if (typeof value === 'object' && excludes.indexOf(key) == -1) {
        // typeof Object
        if (value instanceof Date) {
          value.setHours(0, -value.getTimezoneOffset(), 0, 0);
          formData.append(key, (value as Date).toISOString());
        } else {
          for (const subkey in value) {
            formData.append(`${key}[${subkey}]`, value[subkey]);
          }
        }
      } else {
        // typeof Regular
        formData.append(key, value);
      }
    }
    if (editMode) {
      formData.append('_method', 'PATCH');
    }
    return formData;
  }

  private getHttpParams(params: any): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    if (params) {
      Object.keys(params).map((x: string) => {
        httpParams = httpParams.set(x, params[x]);
      });
    }
    return httpParams;
  }
}
