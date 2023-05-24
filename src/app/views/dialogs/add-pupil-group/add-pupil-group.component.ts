import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";
interface Student {
  id: number;
  name: string;
  isChecked: boolean;
}
@Component({
  selector: 'app-add-pupil-group',
  templateUrl: './add-pupil-group.component.html',
  styleUrls: ['./add-pupil-group.component.scss']
})
export class AddPupilGroupComponent {
  group!:any;
  students: Student[] = [
    { id: 1, name: 'John Doe', isChecked: false },
    { id: 2, name: 'Jane Smith', isChecked: false },
    // Add more students as needed
  ];
  constructor(
    public dialogRef: MatDialogRef<AddPupilGroupComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.group = data;
  }

  add() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width:'250px',
      data: 'Save, students?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
        this.dialogRef.close();
      } else {
        console.log("Oh no!")
        this.dialogRef.close();
      }
    });
  }
}
