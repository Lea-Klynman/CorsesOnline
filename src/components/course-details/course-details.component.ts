import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CourseService } from '../../services/courses.service';
import { LessonService } from '../../services/lesson.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UpdateLessonComponent } from '../update-lesson/update-lesson.component';

@Component({
  selector: 'app-course-details',
  imports: [RouterOutlet, MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,FormsModule,RouterModule,
    CommonModule, ReactiveFormsModule,MatCardModule, ButtonModule,UpdateLessonComponent],

  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  router = inject(Router);
  courseId = -1;
  IsAdding = false;
  lessonForm!: FormGroup;
  newlesson: Lesson | undefined;
  lessonId:number=-1;
  openUpdate=false;
  course$!: Observable<Course>
  lessons$!: Observable<Lesson[]>
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courseService: CourseService, private lessonService: LessonService, private authService: AuthService) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId')?.toString() ?? '');
    this.course$ = this.courseService.getCourse(this.courseId);
    this.lessons$ = this.lessonService.getLessons(this.courseId);
  }
  getAuthRole(): string {
    return this.authService.role;
  }
 
  addLesson() {
    this.router.navigate(['add-lesson',this.courseId]);
  }
  deleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(this.courseId.toString(),lessonId.toString()).subscribe({
      next: res => {
        console.log('Success:', res);
        this.lessons$ = this.lessonService.getLessons(this.courseId);
      },
      error: err => console.error('Error:', err)
    })

  }
  updateLesson(lessonId: number) {
    this.lessonId=lessonId
    this.openUpdate=!this.openUpdate
  }
  IsupdateLesson(){
    console.log("hello");
    this.openUpdate=!this.openUpdate
    this.lessons$ = this.lessonService.getLessons(this.courseId);
  }
 }

 

