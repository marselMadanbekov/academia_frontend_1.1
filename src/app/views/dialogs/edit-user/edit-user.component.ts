import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../service/entityServices/user.service";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  userId: number;
  userForm = this._formBuilder.group({
    firstname: [''],
    lastname: [''],
    fathersName: [''],
    phoneNumber: [''],
    email: ['', Validators.compose([Validators.email])],
    address: ['']
  });

  constructor(private _formBuilder: FormBuilder,
              private userService: UserService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<EditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
    this.userId = data;
  }


  ngOnInit(): void {
  }

  save() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
      data: 'Do you want create this branch?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser({
          firstname: this.userForm.value.firstname,
          lastname: this.userForm.value.lastname,
          email: this.userForm.value.email,
          address: this.userForm.value.address,
          phone_number: this.userForm.value.phoneNumber
        }, this.userId).subscribe(data =>{
          console.log(data);
          this.dialogRef.close();
        },error => {
          console.log(error);
        })
      } else {
        console.log("Oh no!")
        this.dialogRef.close();
      }
    });
  }
}
