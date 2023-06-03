import {Component} from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditGroupComponent} from "../dialogs/edit-group/edit-group.component";
import {CreateUserComponent} from "../dialogs/create-user/create-user.component";
import {ActivatedRoute} from "@angular/router";
import {BranchService} from "../../service/entityServices/branch.service";
import {Branch} from "../../models/Branch";
import {NotificationService} from "../../service/notification.service";
import {CreateGroupComponent} from "../dialogs/create-group/create-group.component";

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent {
  branchId!: number;
  branch!: Branch;

  constructor(private sidebarService: SidebarService,
              private branchService: BranchService,
              private notification: NotificationService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.branchId = param['id'];
      this.branchService.getBranchDetails(this.branchId).subscribe(data => {
        this.branch = data;
        console.log(data);
      }, error => {
        this.notification.showSnackBar(error);
        console.log(error);
      })
    })
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }

  createAdmin() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateUserComponent, {
      width: '600px',
      data: {
        role: 2,
        branchId: this.branch.id,
        lang: 'ru',
        message: 'Create new Admin'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
      } else {
        console.log("Oh no!")
      }
    });
  }

  createNewOwner(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateUserComponent, {
      width: '600px',
      data: {
        role: 1,
        branchId: this.branch.id,
        lang: 'ru',
        message: 'Create new Owner'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
      } else {
        console.log("Oh no!")
      }
    });
  }

  groupCreate():void{
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateGroupComponent, {
      data: {
        role: 1,
        branchId: this.branch.id,
        lang: 'ru',
        message: 'Create new Group'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
      } else {
        console.log("Oh no!")
      }
    });
  }

}
