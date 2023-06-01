import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./views/main-page/main-page.component";
import {BranchDetailsComponent} from "./views/branch-details/branch-details.component";
import {GroupsComponent} from "./views/groupPages/groups/groups.component";
import {TeachersComponent} from "./views/userPages/teachers/teachers.component";
import {PupilsComponent} from "./views/userPages/pupils/pupils.component";
import {SubjectsComponent} from "./views/subjects/subjects.component";
import {AttendanceComponent} from "./views/attendance/attendance.component";
import {LoginComponent} from "./auth/login/login.component";
import {GroupDetailsComponent} from "./views/groupPages/group-details/group-details.component";
import {UserDetailsComponent} from "./views/userPages/user-details/user-details.component";
import {TrenajerComponent} from "./views/trenajer/trenajer.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {MainUserComponent} from "./views/main-user/main-user.component";
import {MainAdminComponent} from "./views/main-admin/main-admin.component";
import {RoleGuardService} from "./helper/role-guard.service";

const routes: Routes = [
  {path: 'main', component: MainAdminComponent, canActivate:[RoleGuardService,AuthGuardService]},
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
  {path: 'trenajer', component: TrenajerComponent},
  {path: 'main-user', component: MainUserComponent},
  {path: 'main-admin', component: MainAdminComponent},

  // {path: 'errorPage', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
