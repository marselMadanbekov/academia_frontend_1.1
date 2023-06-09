import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";
import {User} from "../../../models/User";
import {UserService} from "../../../service/entityServices/user.service";
import {NotificationService} from "../../../service/notification.service";
import {GroupService} from "../../../service/entityServices/group.service";

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
export class AddPupilGroupComponent implements OnInit{
  groupId: number;
  branchId: number;
  selectedPupil!: User;
  pupils!: User[];
  students: Student[] = [
    {id: 1, name: 'John Doe', isChecked: false},
    {id: 2, name: 'Jane Smith', isChecked: false},
  ];

  constructor(
    private dialogRef: MatDialogRef<AddPupilGroupComponent>,
    private dialog: MatDialog,
    private userService: UserService,
    private groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notification: NotificationService
  ) {
    console.log(data);
    this.groupId = data.groupId;
    this.branchId = data.branchId;
  }

  ngOnInit(): void {
    this.userService.getPupilsByBranch(this.branchId).subscribe(data =>{
      this.pupils = data;
    },error => {
      console.log(error);
      this.notification.showSnackBar(error);
    })
  }
  add() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
      data: 'Save, students?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.addPupilToGroup(this.selectedPupil.id,this.groupId).subscribe(data =>{
          console.log(data);
          this.dialogRef.close();
        },error => {
          console.log(error);
          this.notification.showSnackBar(error);
        })
      } else {
        this.dialogRef.close();
      }
    });
  }
}
