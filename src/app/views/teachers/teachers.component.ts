import { Component } from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateTimetableComponent} from "../dialogs/create-timetable/create-timetable.component";
import {CreateUserComponent} from "../dialogs/create-user/create-user.component";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  constructor(private sidebarService: SidebarService,
              private dialog: MatDialog) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }

  createUser() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateUserComponent, {
      width:'600px',
      height:'450px',
      data: 'Save, attendance?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
      } else {
        console.log("Oh no!")
      }
    });
  }
}
