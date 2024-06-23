import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { PrincipalRepositoryService } from '../principal-repo.service';
import { User } from 'src/app/model/security/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends PrincipalRepositoryService<User> {

  constructor(client: HttpClient) {
    super(client, 'User')
  }

}
