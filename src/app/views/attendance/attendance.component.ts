import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../dialogs/confirmation-alert/confirmation-alert.component";
import {UserService} from "../../service/entityServices/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/User";
import {UserAttend} from "../../models/UserAttend";
import {LessonService} from "../../service/entityServices/lesson.service";
import {Group} from "../../models/Group";
import {GroupService} from "../../service/entityServices/group.service";
import {Lesson} from "../../models/Lesson";
import {TokenStorageService} from "../../service/token-storage.service";
import {LanguageService} from "../../service/translations/language.service";


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  groupId!: number;
  currentUser!: User;
  currentLang!: string;
  isLoad: boolean = false;
  group!: Group;
  pupils!: User[];
  studentAttendance!: UserAttend[];
  last3Lessons!: Lesson[];
  selectedLesson: Lesson | null = null;

  constructor(private sidebarService: SidebarService,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private activatedRoute: ActivatedRoute,
              private languageService: LanguageService,
              private lessonService: LessonService,
              private groupService: GroupService,
              private userService: UserService,
              private dialog: MatDialog) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.groupId = param['groupId'];
    })
  }

  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })
    this.refreshData();
  }

  refreshData(): void {
    this.userService.getPupilsByGroup(this.groupId).subscribe(data => {
      this.pupils = data;
      this.studentAttendance = data.map((pupil: User) => {
        return {
          id: pupil.id,
          firstname: pupil.firstname,
          lastname: pupil.lastname,
          attend: false
        };
      });
      this.lessonService.getLast3LessonsByGroupId(this.groupId).subscribe(data => {
        this.last3Lessons = data;
        this.isLoad = true;
        console.log(data);
      }, error => {
        console.log(error)
      })

      console.log(this.studentAttendance);
    });
    this.groupService.getGroupById(this.groupId).subscribe(data => {
      this.group = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  language(lang: string) {
    this.languageService.toggle(lang);
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }

  save(): void {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
      data: 'Save, attendance?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selectedLesson === null) {
          this.lessonService.createLesson({
            group: this.group,
            attendance: this.studentAttendance,
          }).subscribe(data => {
            console.log(data);
            this.refreshData();
          }, error => {
            console.log(error);
          })
        } else {
          this.lessonService.updateLesson(this.selectedLesson.id, {
            attendance: this.studentAttendance,
            group: this.group
          }).subscribe(data => {
            console.log(data);
          }, error => {
            console.log(error);
          })
        }
      } else {
        console.log("Oh no!")
      }
    });
  }

  change() {
    console.log(this.studentAttendance);
  }

  lessonChange() {
    if (this.selectedLesson === null) {
      this.studentAttendance = this.pupils.map((pupil: User) => {
        return {
          id: pupil.id,
          firstname: pupil.firstname,
          lastname: pupil.lastname,
          attend: false
        };
      });
    } else {
      this.studentAttendance = this.selectedLesson.attendance;
    }
  }

  profile() {
    this.router.navigate(['user-details'], {queryParams: {userId: 0}});
  }

  logout() {
    this.tokenStorage.logOut();
    this.router.navigate(['login'])
  }
}
