import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateTimetableComponent} from "../../dialogs/create-timetable/create-timetable.component";
import {CreateUserComponent} from "../../dialogs/create-user/create-user.component";
import {User} from "../../../models/User";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../service/entityServices/user.service";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit{
  teachers!: User[];
  branchId!: number;

  constructor(private sidebarService: SidebarService,
              private userService: UserService,
              private activatedRout: ActivatedRoute,
              private dialog: MatDialog) {
    this.activatedRout.queryParams.subscribe(param =>{
      this.branchId = param['id'];
    })
  }

  ngOnInit(): void {
    this.refreshData();
  }
  sidebarToggle() {
    this.sidebarService.toggle();
  }

  refreshData(): void{
    this.userService.getTeachersByBranch(this.branchId).subscribe(data =>{
      this.teachers = data;
    })
  }

  createTeacher() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateUserComponent, {
      width:'600px',
      data: {
        role: 3,
        branchId: this.branchId,
        lang: 'ru',
        message: 'Create new Teacher'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }
}
