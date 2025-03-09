import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/courses.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { Course } from '../../models/course';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,MatIconModule, CommonModule, MatListModule, MatFormFieldModule, MatInputModule, MatExpansionModule],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent {
 courseId!: number;
  courseForm!: FormGroup;

course!: Course
constructor(private route: ActivatedRoute,private fb: FormBuilder,private coursesService: CourseService,private authService: AuthService) {
  this.courseForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });
}
ngOnInit(): void {
  this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId')?.toString() ?? '');
  this.coursesService.getCourse(this.courseId).subscribe(res => {
    this.course = res;
    this.courseForm = this.fb.group({
      title: [this.course.title, Validators.required],
      description: [this.course.description, Validators.required]
    });
  });
  }

  updateCourse() {
    if (this.courseForm.valid) {
      const updatedCourse: Course = {
        id: this.courseId,
        title: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        teacherId: this.authService.userId
      };
      console.log(updatedCourse);
      
      this.coursesService.updateCourse(updatedCourse).subscribe(() => {
        console.log('Course updated successfully');
      });
      this.coursesService.getCourses();
    }
  }
}
