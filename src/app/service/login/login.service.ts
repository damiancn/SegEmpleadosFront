import { Injectable } from '@angular/core';
import { PrincipalRepositoryService } from '../principal-repo.service';
import { Login } from 'src/app/model/common/login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from 'src/app/model/common/service-response';
import { Credential } from 'src/app/model/common/credential';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends PrincipalRepositoryService<Credential> {

  constructor(client: HttpClient) {
    super(client, 'Login')
  }
  logIn(model: Login): Observable<ServiceResponse<Credential>> {
    const url = this.getApi() + '/login';
    return this.gethttpClient().post<ServiceResponse<Credential>>(url, model);
  }
}
