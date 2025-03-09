import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Role, User } from '../../models/User';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
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
      console.log(this.user);
      
      if (this.user)
        this.authService.register(this.user).subscribe({next:(res) => {         
          this.authService.isAuth = true;
          console.log("register successful");  
          console.log(res.token);
          sessionStorage.setItem('token',res.token);
          console.log(res.userId);
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
      email: [''],
      password: [''],
      name: [''],
      role: ['']
    });
  }
}
