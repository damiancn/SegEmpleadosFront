import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRepositoryService } from '../principal-repo.service';
import { Employee } from 'src/app/model/process/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends PrincipalRepositoryService<Employee> {

  constructor(client: HttpClient) {
    super(client, 'Employee')
  }
}
