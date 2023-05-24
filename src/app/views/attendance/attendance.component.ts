import { Component } from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../dialogs/confirmation-alert/confirmation-alert.component";

interface Student {
  id: number;
  name: string;
  isChecked: boolean;
}
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {
  students: Student[] = [
    { id: 1, name: 'John Doe', isChecked: false },
    { id: 2, name: 'Jane Smith', isChecked: false },
    // Add more students as needed
  ];

  constructor(private sidebarService: SidebarService,
              private dialog: MatDialog) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }
  updateAttendance(student: Student) {
    // Perform any necessary actions when attendance is updated
    console.log('Attendance updated:', student);
  }

  openConfirmationDialog(): void {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
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
