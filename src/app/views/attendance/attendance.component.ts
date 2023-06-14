import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../dialogs/confirmation-alert/confirmation-alert.component";
import {UserService} from "../../service/entityServices/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/User";
import {UserAttend} from "../../models/UserAttend";
import {LessonService} from "../../service/entityServices/lesson.service";
import {Group} from "../../models/Group";
import {GroupService} from "../../service/entityServices/group.service";


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit{
  groupId!: number;
  group!: Group;
  studentAttendance!: UserAttend[];

  constructor(private sidebarService: SidebarService,
              private activatedRoute: ActivatedRoute,
              private lessonService: LessonService,
              private groupService: GroupService,
              private userService: UserService,
              private dialog: MatDialog) {
    this.activatedRoute.queryParams.subscribe(param =>{
      this.groupId = param['groupId'];
    })
  }

  ngOnInit(): void {
    this.userService.getPupilsByGroup(this.groupId).subscribe(data => {
      this.studentAttendance = data.map((pupil: User) => {
        return {
          id: pupil.id,
          firstname: pupil.firstname,
          lastname: pupil.lastname,
          attend: false
        };
      });
      console.log(this.studentAttendance);
    });
    this.groupService.getGroupById(this.groupId).subscribe(data =>{
      this.group = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
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
        this.lessonService.createLesson({
          group: this.group,
          attendance: this.studentAttendance,
        }).subscribe(data =>{
          console.log(data);
        },error => {
          console.log(error);
        })
      } else {
        console.log("Oh no!")
      }
    });
  }

  change() {
    console.log(this.studentAttendance);
  }
}
