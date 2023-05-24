import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent {
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });

  constructor(
    public dialogRef: MatDialogRef<EditGroupComponent>,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  save() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width:'250px',
      data: 'Save, attendance?',
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
