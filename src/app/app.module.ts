import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SidebarService} from "./service/sidebar.service";
import { BranchDetailsComponent } from './views/branch-details/branch-details.component';
import { GroupsComponent } from './views/groupPages/groups/groups.component';
import { TeachersComponent } from './views/userPages/teachers/teachers.component';
import { PupilsComponent } from './views/userPages/pupils/pupils.component';
import { SubjectsComponent } from './views/subjects/subjects.component';
import {MatMenuModule} from "@angular/material/menu";
import {TranslationPipe} from "./service/translations/translation.pipe";
import { AttendanceComponent } from './views/attendance/attendance.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { ConfirmationAlertComponent } from './views/dialogs/confirmation-alert/confirmation-alert.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { LoginComponent } from './auth/login/login.component';
import { GroupDetailsComponent } from './views/groupPages/group-details/group-details.component';
import {AddPupilGroupComponent} from "./views/dialogs/add-pupil-group/add-pupil-group.component";
import { EditGroupComponent } from './views/dialogs/edit-group/edit-group.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatTabsModule} from "@angular/material/tabs";
import { UserDetailsComponent } from './views/userPages/user-details/user-details.component';
import { DayStatComponent } from './views/charts/day-stat/day-stat.component';
import {MatInputModule} from "@angular/material/input";
import { CreateTimetableComponent } from './views/dialogs/create-timetable/create-timetable.component';
import { EditUserComponent } from './views/dialogs/edit-user/edit-user.component';
import { CreateUserComponent } from './views/dialogs/create-user/create-user.component';
import { CreateGroupComponent } from './views/dialogs/create-group/create-group.component';
import { CreateBranchComponent } from './views/dialogs/create-branch/create-branch.component';
import { NotFoundComponent } from './views/errorPages/not-found/not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { TestComponent } from './views/test/test.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import { TrenajerComponent } from './views/trenajer/trenajer.component';
import { MainAdminComponent } from './views/usersMainPages/main-admin/main-admin.component';
import { MainUserComponent } from './views/usersMainPages/main-user/main-user.component';
import {CRoleService} from "./service/current/c-role.service";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProvider} from "./helper/error-interceptor.service";
import { CreateSubjectComponent } from './views/dialogs/create-subject/create-subject.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { AdminComponent } from './views/usersMainPages/admin/admin.component';

@NgModule({
  declarations: [AppComponent,
    BranchDetailsComponent,
    GroupsComponent,
    TeachersComponent,
    PupilsComponent,
    TranslationPipe,
    SubjectsComponent,
    AttendanceComponent,
    ConfirmationAlertComponent,
    LoginComponent,
    GroupDetailsComponent,
    AddPupilGroupComponent,
    EditGroupComponent,
    UserDetailsComponent,
    DayStatComponent,
    CreateTimetableComponent,
    EditUserComponent,
    CreateUserComponent,
    CreateGroupComponent,
    CreateBranchComponent,
    NotFoundComponent,
    TestComponent,
    TrenajerComponent,
    MainAdminComponent,
    MainUserComponent,
    CreateSubjectComponent,
    AdminComponent,],
    imports: [
        MatSnackBarModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatMenuModule,
        FormsModule,
        MatRadioModule,
        MatSelectModule,
        MatDialogModule,
        MatStepperModule,
        MatTabsModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatListModule,
        MatCardModule,
        MatAutocompleteModule,
    ],
  providers: [authInterceptorProviders,authErrorInterceptorProvider,SidebarService,TranslationPipe,CRoleService],
  bootstrap: [AppComponent],
})
export class AppModule { }
