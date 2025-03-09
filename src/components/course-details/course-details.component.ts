import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/courses.service';
import { LessonService } from '../../services/lesson.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
 courseId!: number;
  IsAdding = false;
  lessonForm!: FormGroup;
  newlesson: Lesson | undefined
  course$!: Observable<Course>
  lessons$!: Observable<Lesson[]>
  length: number=0;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courseService: CourseService, private lessonService: LessonService, private authService: AuthService) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId')?.toString() ?? '');
    this.course$ = this.courseService.getCourse(this.courseId);
    this.lessons$ = this.lessonService.getLessons(this.courseId)
    this.lessons$.subscribe(res => {
      this.length = res.length;});
  }
  getLengthLessons():number {
   return this.length;
  }
  
  getAuthRole(): string {
    return this.authService.role;
  }
  handelOpen() {
    this.lessonForm.reset();
    this.IsAdding = !this.IsAdding
  }
  addLesson() {
    if (this.lessonForm.valid) {
      this.newlesson = this.lessonForm.value;
      if (this.newlesson) {
        this.lessonService.addLesson(this.courseId.toString(), this.newlesson).subscribe({
          next: res => {
            console.log('Success:', res);
            this.lessons$ = this.lessonService.getLessons(this.courseId);
            this.lessons$.subscribe(res => {
              this.length = res.length;});
          },
          error: err => console.error('Error:', err)
        })
      }
      this.IsAdding = !this.IsAdding
    }
  }

  deleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(this.courseId, lessonId).subscribe({
      next: res => {
        console.log('Success:', res);
        this.lessons$ = this.lessonService.getLessons(this.courseId);
        this.lessons$.subscribe(res => {
          this.length = res.length;});
      },
      error: err => console.error('Error:', err)
    })
  }
 }

 

