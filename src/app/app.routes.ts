import { Routes } from '@angular/router';
import { ApplayoutComponent } from '../components/applayout/applayout.component';
import { CourseListComponent } from '../components/course-list/course-list.component';
import { CoursesManagementComponent } from '../components/courses-management/courses-management.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { UpdateCourseComponent } from '../components/update-course/update-course.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';

export const routes: Routes = [
  {
    path: '', component: ApplayoutComponent, canActivate: [authGuard], children: [
      { path: 'course', component: CourseListComponent },
      { path: 'course/:courseId', component: CourseDetailsComponent },
      { path: 'coursesManagement', component: CoursesManagementComponent },
      { path: 'add-course/:userId', component: AddCourseComponent },
      { path: 'update-course/:courseId', component: UpdateCourseComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
