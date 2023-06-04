import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../service/entityServices/user.service";
import {User} from "../../../models/User";
import {CreateGroupComponent} from "../../dialogs/create-group/create-group.component";
import {CreateUserComponent} from "../../dialogs/create-user/create-user.component";
import {ConfirmationAlertComponent} from "../../dialogs/confirmation-alert/confirmation-alert.component";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.component.html',
  styleUrls: ['./pupils.component.scss']
})
export class PupilsComponent implements OnInit{
  branchId!: number;
  pupils!: User[];
  constructor(private sidebarService: SidebarService,
              private activatedRoute: ActivatedRoute,
              private notification: NotificationService,
              private userService: UserService,
              private dialog: MatDialog,
  ) {
    this.activatedRoute.queryParams.subscribe(param => {
        this.branchId = param['id'];
      }
    )
  }
  ngOnInit(): void {
    this.refreshData();
  }

  refreshData():void{
    this.userService.getPupilsByBranch(this.branchId).subscribe(data =>{
      this.pupils = data;
    })
  }
  sidebarToggle() {
    this.sidebarService.toggle();
  }

  createUser() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateUserComponent, {
      width:'600px',
      data: {
        role: 4,
        branchId: this.branchId,
        lang: 'ru',
        message: 'Create new Pupil'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  pupilDelete(pupil: User) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width:'250px',
      data: 'Do you want create this pupil?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
        this.userService.deleteUser(pupil.id).subscribe(data =>{
          console.log(data);
          this.notification.showSnackBar('successfully deleted');
          this.refreshData();
        },error => {
          this.notification.showSnackBar(error);
        })
      } else {
        console.log("Oh no!")
      }
    });
  }
}
