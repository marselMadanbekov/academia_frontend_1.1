import { Component } from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditGroupComponent} from "../dialogs/edit-group/edit-group.component";
import {CreateUserComponent} from "../dialogs/create-user/create-user.component";

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent {
  constructor(private sidebarService: SidebarService,
              private dialog: MatDialog,) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }

  createAdmin() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateUserComponent, {
      width:'600px',
      height: '450px',
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

  settings() {

  }
}
