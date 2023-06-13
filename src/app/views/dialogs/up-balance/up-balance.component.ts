import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/User";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BranchService} from "../../../service/entityServices/branch.service";
import {UserService} from "../../../service/entityServices/user.service";
import {NotificationService} from "../../../service/notification.service";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";

@Component({
  selector: 'app-up-balance',
  templateUrl: './up-balance.component.html',
  styleUrls: ['./up-balance.component.scss']
})
export class UpBalanceComponent {
  balanceForm: FormGroup;
  userId: number;
  constructor(private dialogRef: MatDialogRef<UpBalanceComponent>,
              private userService: UserService,
              private notification: NotificationService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private formBuilder: FormBuilder) {
    this.balanceForm = this.createGroupForm();
    this.userId = data;
  }

  createGroupForm(): FormGroup {
    return this.formBuilder.group({
      balance: ['', Validators.compose([Validators.required,Validators.min(300), Validators.pattern('^[0-9]+$')])],
    });
  }

  onSubmit() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
      data: 'Do you want create this branch?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.balanceUp(this.userId, this.balanceForm.value.balance).subscribe(data =>{
          console.log(data);
          this.dialogRef.close();
        },error => {
          this.notification.showSnackBar(error);
          console.log(error);
        })
      } else {
        console.log("Oh no!")
        this.dialogRef.close();
      }
    });
  }

  ngOnInit(): void {

  }
}
