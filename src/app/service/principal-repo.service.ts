import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../model/common/service-response';

export abstract class PrincipalRepositoryService<T> {
  private readonly url: string;

  constructor(public httpClient: HttpClient, public controlador: string,) {
    this.url = environment.urlServicios + '/api/' + controlador;
  }

  getApi() { return this.url; }
  gethttpClient() { return this.httpClient; }

  get(): Observable<ServiceResponse<T[]>> {
    console.log("🚀 ~ PrincipalRepositoryService<T> ~ get ~ gethttpClient:", this.gethttpClient())
    return this.gethttpClient().get<ServiceResponse<T[]>>(this.url);
  }

  getId(id: string): Observable<ServiceResponse<T>> {
    const url = this.url + `/${id}`;
    return this.httpClient.get<ServiceResponse<T>>(url);
  }

  update(id: string, entidad: T): Observable<ServiceResponse<T>> {
    const url = this.url + `/${id}`;
    return this.httpClient.put<ServiceResponse<T>>(url, entidad);
  }

  delete(id: string): Observable<ServiceResponse<T>> {
    const url = this.url + '/' + id;
    return this.httpClient.delete<ServiceResponse<T>>(url);
  }


  save(object: T): Observable<ServiceResponse<T>> {
    const url = this.url;
    return this.httpClient.post<ServiceResponse<T>>(url, object);
  }

  // changeStatus(id: number, estatus: boolean): Observable<ServiceResponse<T>> {
  //   const url = `${this.url}/ChangeStatus/${id}`;
  //   return this.httpClient.put<ServiceResponse<T>>(url, estatus);
  // }
}
