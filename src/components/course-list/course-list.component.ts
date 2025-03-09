import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IconPipe } from "../../app/pipe/icon.pipe";
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, IconPipe, TableModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  courses!: Course[];
  studentCourses!: Course[];
  router = inject(Router);
  

  constructor(private coursesService: CourseService, private authService: AuthService) {
  }

  ngOnInit() {
    this.coursesService.getCourses();
    this.coursesService.courses$.subscribe(courses => {
      this.courses = courses;
      console.log(this.courses);
    });
  }
  getAuthServiceRole(): string {
    return this.authService.role;
  }


  enroll(courseId: number) {
    this.coursesService.enroll(courseId, this.authService.userId)
  }

  unenroll(courseId: number) {
    this.coursesService.unenroll(courseId, this.authService.userId)
  
  }


 
  isEnrolled(courseId: number): Observable<boolean> {
    return this.coursesService.isEnrolled(courseId).pipe(
      map((result) => {
        console.log(`Is enrolled in course ${courseId}: ${result}`);
        return result;
      })
    );
  }
  update(course: Course) {
    this.router.navigate(['/update-course', course.id]);
  }
  showCourse(courseid: number) {
    this.router.navigate(['/course', courseid]);
  }

  deleteCourse(id: number) {
    this.coursesService.deleteCourse(id)
    console.log("delete course");
    
  }

  add() {
    const userId = this.authService.userId;
    this.router.navigate(['/add-course', userId]);
  }

}
