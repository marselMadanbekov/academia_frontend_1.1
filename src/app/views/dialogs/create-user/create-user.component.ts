import {Component, Inject, Input} from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class CreateUserComponent {
  firstFormGroup = this._formBuilder.group({
    firstname: ['', Validators.compose([Validators.required])],
    lastname: ['', Validators.compose([Validators.required])],
    fathersName: ['', Validators.compose([Validators.required])],
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });
  secondFormGroup = this._formBuilder.group({
    age: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
    email: ['', Validators.compose([Validators.email])],
    address: ['',Validators.compose([])],
    phoneNumber:['',Validators.compose([])]
  });
  selectedRole: number = 1;
  @Input() lang!: string;

  constructor(private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<CreateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
    this.lang = data;
  }



  submit() {
    let currentRole;
    switch (this.selectedRole) {
      case 1:
        currentRole = 'ROLE_TEACHER';
        break;
      case 2:
        currentRole = 'ROLE_ADMIN';
        break;
      case 3:
        currentRole = 'ROLE_PUPIL';
        break;
      default:
        break;
    }
    this.dialogRef.close();
  }
}
