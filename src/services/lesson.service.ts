import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {  
      
private apiUrl = 'http://localhost:3000/api/courses';
constructor(private http: HttpClient) { }

// Get all lessons in a course
getLessons(courseId: number){
  return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`);
}

getLessonById(courseId: string, lessonId: string){
  return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
}
addLesson(courseId: string,lesson: Lesson){
  return this.http.post(`${this.apiUrl}/${courseId}/lessons`,lesson);

}

updateLesson(courseId: number, lessonId: number, lesson: Lesson): Observable<any> {
  return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson);
}

deleteLesson(courseId: number, lessonId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
}
}
