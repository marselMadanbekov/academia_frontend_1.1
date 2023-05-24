import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  firstFormGroup = this._formBuilder.group({
    firstname: [''],
    lastname: [''],
    fathersName: [''],
    phoneNumber: [''],
    email: ['', Validators.compose([Validators.email])],
    address: ['']
  });

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close();
  }
}
