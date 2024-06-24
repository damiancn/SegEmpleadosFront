import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRepositoryService } from '../principal-repo.service';
import { Beneficiary } from 'src/app/model/process/beneficiary';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService extends PrincipalRepositoryService<Beneficiary> {

  constructor(client: HttpClient) {
    super(client, 'Beneficiary')
  }
}
