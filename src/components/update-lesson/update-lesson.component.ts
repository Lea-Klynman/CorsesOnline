import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-lesson',
  imports: [CommonModule,ReactiveFormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,RouterLink],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.css'
})
export class UpdateLessonComponent {
  @Output() updateLessonEvent = new EventEmitter<void>(); 
  @Input() lessonId=-1;
@Input() courseId=-1;
 updateForm!: FormGroup
  lesson$!: Observable<Lesson>
  constructor(private fb: FormBuilder,  private lessonService: LessonService) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  } 
  ngOnInit(): void {
    this.lesson$ = this.lessonService.getLessonById(this.courseId.toString(),this.lessonId.toString());
    this.lesson$.subscribe((lesson: Lesson) => {
      this.updateForm = this.fb.group({
        title: [lesson.title, Validators.required],
        content: [lesson.content, Validators.required],
      })
    })
  }
  updateLesson(){
    if(this.updateForm.valid){
      const updateLesson:Lesson={
        id: this.lessonId,
        title: this.updateForm.value.title,
        content: this.updateForm.value.content,
        courseId: this.courseId
      }
      this.lessonService.updateLesson(this.courseId.toString(),updateLesson).subscribe({next:() => {
        this.updateLessonEvent.emit();
      }, error:(error) => {
        console.log('Error updating lesson:', error);    
      }});
    }
  }
}
