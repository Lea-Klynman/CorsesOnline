import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { partUser} from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatCardModule
    ,MatFormFieldModule,MatButtonModule,RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);

  @Output() formClose = new EventEmitter<void>();
  @Input() showForm = false;
  user: partUser = {};
  signInForm!: FormGroup;
  email: string = '';
  password: string = ''; 
  constructor( private fb: FormBuilder, private authService: AuthService) { 
  }
  logIn(): void {
    if (this.signInForm?.valid) {
      this.user = this.signInForm.value;
      if (this.user)
        this.authService.login(this.user).subscribe({next:(res) => {     
       this.authService.isAuth = true;
          console.log("login successful");
          console.log(res.token);
          sessionStorage.setItem('token',res.token);
          this.authService.role = res.role;
          console.log(res.userId);
          this.authService.userId = res.userId;
          this.router.navigate(['/']); 
        },
         error:( error) => {
            console.log("login failed");
          },

    });
      this.signInForm?.reset();
      this.formClose.emit();
    }
  }
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
}
