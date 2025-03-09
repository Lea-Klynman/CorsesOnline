import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../../services/courses.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,MatIconModule, CommonModule, MatListModule, MatFormFieldModule, MatInputModule, MatExpansionModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  userId!: number;
  courseForm!: FormGroup;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private coursesService: CourseService) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

   }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('userId')?.toString() ?? '');
  }

  addCourse() {
    if (this.courseForm.valid) {
      this.coursesService.createCourse(this.courseForm.value).subscribe({
        next: res => {
          console.log('Success:', res),
            this.courseForm.reset();
        },
        error: err => console.error('Error:', err)
      });
    }
  }
}
