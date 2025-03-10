import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Role, User } from '../../models/User';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatError } from '@angular/material/form-field';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,MatError,RouterLink,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatRadioModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router = inject(Router);
  @Output() formClose = new EventEmitter<void>();
  user: User | undefined;
  registerForm!: FormGroup;
  role!: Role ;
  name: string = '';
  email: string = '';
  password: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService) { }
  register(): void {
    if (this.registerForm?.valid) {
      this.user = this.registerForm.value;
      
      if (this.user)
        this.authService.register(this.user).subscribe({next:(res) => {         
          this.authService.isAuth = true;
          
          sessionStorage.setItem('token',res.token);
          this.authService.userId = res.userId;
          this.authService.role = this.user!.role;   
          this.router.navigate(['/']); 
        },
        error:(error) => {
            console.log("register failed");
          }
    });
      this.registerForm?.reset();
      this.formClose.emit();

    }
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      name: ['',Validators.required],
      role: ['',[Validators.required]]
    });
  }
}
