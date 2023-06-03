import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateUserComponent} from "../../dialogs/create-user/create-user.component";
import {UserService} from "../../../service/entityServices/user.service";
import {User} from "../../../models/User";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-branch-owners',
  templateUrl: './branch-owners.component.html',
  styleUrls: ['./branch-owners.component.scss']
})
export class BranchOwnersComponent implements OnInit{

  branchOwners!: User[];

  constructor(private sidebarService: SidebarService,
              private userService: UserService,
              private notification : NotificationService,
              private dialog: MatDialog) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }

  createUser() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateUserComponent, {
      width:'600px',
      height:'450px',
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

  ngOnInit(): void {
    this.userService.getBranchOwners().subscribe(data =>{
      this.branchOwners = data;
    },error => {
      this.notification.showSnackBar(error);
    })
  }
}
