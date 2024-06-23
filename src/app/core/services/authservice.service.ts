import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Credential } from 'src/app/model/credential';
// import { Credencial } from 'src/app/data/models/seguridad/credencial';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly crendencial = 'credencial';
  rutaRedireccion!: string;
  invalido!: Credential;

  public get credencial(): Credential {
    const credencialTexto = window.localStorage.getItem(this.crendencial);
    if (credencialTexto) {
      return JSON.parse(credencialTexto);
    }
    return this.invalido;
  }

  constructor(private router: Router) { }

  asignarCredencial(credencial: Credential): void {
    window.localStorage.setItem(this.crendencial, JSON.stringify(credencial));
  }

  getCredencial(): Observable<boolean> {
    let bool = false;
    const credencialString = localStorage.getItem('credencial');
    if (credencialString) {
      bool = true;
    }
    return of(bool);
  }

  public get ingreso(): boolean {
    const credencial = window.localStorage.getItem(this.crendencial);
    if (!credencial) {
      return false;
    }
    return true;
  }

  async salir(): Promise<void> {
    window.localStorage.removeItem(this.crendencial);
    this.router.navigate(['login']);
  }

  accesoRestringido(): void {
    this.router.navigate(['AccesoRestringido']);
  }

  public obtenerCredencial(): Credential {
    const json = window.localStorage.getItem(this.crendencial);
    if (!json) {
      return {
        token: '',
        userId: 0
      };
    }
    return JSON.parse(json);
  }

  public obtenerToken(): string {
    return this.obtenerCredencial().token;
  }
}
