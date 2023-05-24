import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./views/main-page/main-page.component";
import {BranchDetailsComponent} from "./views/branch-details/branch-details.component";
import {GroupsComponent} from "./views/groups/groups.component";
import {TeachersComponent} from "./views/teachers/teachers.component";
import {PupilsComponent} from "./views/pupils/pupils.component";
import {SubjectsComponent} from "./views/subjects/subjects.component";
import {AttendanceComponent} from "./views/attendance/attendance.component";
import {LoginComponent} from "./auth/login/login.component";
import {GroupDetailsComponent} from "./views/group-details/group-details.component";
import {UserDetailsComponent} from "./views/user-details/user-details.component";

const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: 'branch', component: BranchDetailsComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'teachers', component: TeachersComponent},
  {path: 'pupils', component: PupilsComponent},
  {path: 'subjects', component: SubjectsComponent},
  {path: 'attendance', component: AttendanceComponent},
  {path: 'login', component: LoginComponent},
  {path: 'group-details', component: GroupDetailsComponent},
  {path: 'user-details', component: UserDetailsComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  // {path: 'errorPage', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
