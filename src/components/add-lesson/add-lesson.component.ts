import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/courses.service';
import { LessonService } from '../../services/lesson.service';
import { AuthService } from '../../services/auth.service';
import { Lesson } from '../../models/lesson';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-lesson',
  imports: [CommonModule,ReactiveFormsModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  lessonForm!: FormGroup;
  newlesson: Lesson | undefined;
  courseId:number=-1;
  lessons$!: Observable<Lesson[]>
    router = inject(Router);
  
  
 constructor(private fb: FormBuilder, private route: ActivatedRoute, private courseService: CourseService, private lessonService: LessonService, private authService: AuthService) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
}
ngOnInit() {
  this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId')?.toString() ?? '');
  this.lessons$ = this.lessonService.getLessons(this.courseId);

}
addLesson() {
  if (this.lessonForm.valid) {
    this.newlesson = this.lessonForm.value;
    if (this.newlesson) {
      this.lessonService.addLesson(this.courseId.toString(), this.newlesson).subscribe({
        next: res => {
          this.lessons$ = this.lessonService.getLessons(this.courseId);
        },
        error: err => console.error('Error:', err)
      })
    }
  }
  this.lessonForm.reset();
  this.router.navigate(['/course', this.courseId]);
}
comeback(){
  this.router.navigate(['/course', this.courseId]);
}
}