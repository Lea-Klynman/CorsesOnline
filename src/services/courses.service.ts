import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Course } from '../models/course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/api/courses';
  private coursesBehaviorSubject = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]> =
    this.coursesBehaviorSubject.asObservable();
 private myCoursesBehaviorSubject = new BehaviorSubject<Course[]>([]);
  public myCourses$: Observable<Course[]> =
    this.myCoursesBehaviorSubject.asObservable();
  constructor(private http: HttpClient ,private authService: AuthService) { 
    this.getCourses();
    this.getStuentCourses(this.authService.userId);
  }

  // GET all courses
  getCourses(): void {
       
     this.http.get<Course[]>(this.apiUrl).subscribe(
      (courses) => {
        this.coursesBehaviorSubject.next(courses);
        console.log(courses);
      },
      (error) => alert('Error:' + error.message)
    );;
      
  }

  // GET course by ID
  getCourse(id: number): Observable<Course> {
   
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // POST create new course (for teachers)
  createCourse(course: Course): Observable<Course> {
   
    return this.http.post<Course>(this.apiUrl, course).pipe(tap(() =>   this.getCourses()));
  }

  // PUT update course by ID (for teachers)
  updateCourse(course: Course): Observable<Course> {
  
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(tap(() => this.getCourses()));
  }

  // DELETE course by ID (for teachers)
  deleteCourse(id: number): Observable<any> {
    console.log("service.deleteCourse");
    
    const res= this.http.delete(`${this.apiUrl}/${id}`);
    res.subscribe(() => {this.getCourses();  
    });
    return res;
  }


  enroll(courseId: number,userId: number):void {
     this.http.post(`${this.apiUrl}/${courseId}/enroll`, {userId}).subscribe(()=> {
     this.getStuentCourses(userId)
    }
    );
  }

  unenroll(courseId: number,userId: number): void { 
    console.log(userId);  
     this.http.delete(`${this.apiUrl}/${courseId}/unenroll`,  {body: {userId}} )
     .subscribe(()=> {
        this.getStuentCourses(userId)
      });
  }

  getStuentCourses(userId: number):void {
     this.http.get<Course[]>(`${this.apiUrl}/student/${userId}`).subscribe(
      (courses) => {
        this.myCoursesBehaviorSubject.next(courses);
      },
      (error) => alert('Error:' + error.message));
  }
  isEnrolled(courseId: number):Observable< boolean> {
    const res = this.myCourses$.pipe(
      map((courses) => courses.some((course) => course.id === courseId))
    );
    return res;
  }
}