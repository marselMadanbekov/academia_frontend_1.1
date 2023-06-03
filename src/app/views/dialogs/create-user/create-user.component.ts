import {Component, Inject, Input} from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../service/entityServices/user.service";
import {NotificationService} from "../../../service/notification.service";

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
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });
  secondFormGroup = this._formBuilder.group({
    age: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
    email: ['', Validators.compose([Validators.email])],
    address: ['', Validators.compose([])],
    phoneNumber: ['', Validators.compose([])]
  });
  selectedRole: number = 1;
  toBranch: number;
  message: string;
  @Input() lang!: string;

  constructor(private _formBuilder: FormBuilder,
              private userService: UserService,
              private notification: NotificationService,
              private dialogRef: MatDialogRef<CreateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.selectedRole = data.role;
    this.toBranch = data.branchId;
    this.lang = data.lang;
    this.message = data.message;
  }

  submit() {
    let currentRole;
    switch (this.selectedRole) {
      case 0:
        currentRole = 'ROLE_SUPER_ADMIN';
        break;
      case 1:
        currentRole = 'ROLE_BRANCH_OWNER';
        break;
      case 2:
        currentRole = 'ROLE_ADMIN';
        break;
      case 3:
        currentRole = 'ROLE_TEACHER';
        break;
      case 4:
        currentRole = 'ROLE_PUPIL';
        break;
      default:
        break;
    }
    console.log(currentRole);

    this.userService.createUser({
      firstname: this.firstFormGroup.value.firstname,
      lastname: this.firstFormGroup.value.lastname,
      username: this.firstFormGroup.value.username,
      password: this.firstFormGroup.value.password,
      confirm_password: this.firstFormGroup.value.confirmPassword,
      role: currentRole,
      phone_number: this.secondFormGroup.value.phoneNumber,
      email: this.secondFormGroup.value.email,
      address: this.secondFormGroup.value.address,
      age: this.secondFormGroup.value.age,
      branchId: this.toBranch,
    }).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    }, error => {
      this.notification.showSnackBar(error);
      console.log(error);
    })
  }
}
