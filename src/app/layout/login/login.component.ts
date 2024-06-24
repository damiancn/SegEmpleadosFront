import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/model/common/login';
import { AlertService } from 'src/app/components/alert';
import { AuthService } from '../../core/services/authservice.service';
import { LoginService } from '../../service/login/login.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule,
  ],
  providers: [AuthService, AlertService],

})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private loginService: LoginService,
    private alertService: AlertService,
    private authService: AuthService,

  ) {
  }
  subscription = new Subscription;

  ngOnInit(): void {
    this.login();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createFormLogin(): void {
    this.form = this.formBuilder.group({
      user: [''],
      password: [''],
    });
    console.log("🚀 ~ LoginComponent ~ createFormLogin ~ this.form:", this.form)
  }

  login(): void {
    if (this.form.valid) {
      const data = this.form.value as Login;
      this.startLogin(data);
    }
  }
  startLogin(login: Login): void {
    this.subscription.add(
      this.loginService.logIn(login).subscribe({
        next: (e) => {
          if (e.ok) {
            this.route.navigate(['/pages/beneficiario']);
            this.authService.asignarCredencial(e.dto);
          } else {
            this.alertService.showError(e.message);
          }
        },
        error: (e) => {
          this.alertService.showError(e.message);
        },
      })
    )
  }
  showCard() {
    const fondo = document.getElementById('fondo');
    const card = document.getElementById('card');

    if (fondo && card) {
      card.style.opacity = '1';
      card.style.visibility = 'visible';
    }
    this.createFormLogin();
  }


}
