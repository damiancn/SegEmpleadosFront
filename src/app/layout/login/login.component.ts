import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
  ) {
  }
  subscription = new Subscription;

  ngOnInit(): void {
    this.subscription.add(
      this.userService.get().subscribe({
        next:(e) => {
          console.log("🚀 ~ LoginComponent ~ this.userService.get ~ e:", e)          
        }
      })
    )
    this.createFormLogin();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createFormLogin(): void {
    this.form = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  login(): void {
  }

  showCard() {
    const fondo = document.getElementById('fondo');
    const card = document.getElementById('card');

    if (fondo && card) {
      card.style.opacity = '1';
      card.style.visibility = 'visible';
    }
  }

}
