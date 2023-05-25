import { Component } from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddPupilGroupComponent} from "../../dialogs/add-pupil-group/add-pupil-group.component";
import {EditGroupComponent} from "../../dialogs/edit-group/edit-group.component";
import {Router} from "@angular/router";
import {EditUserComponent} from "../../dialogs/edit-user/edit-user.component";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  constructor(private sidebarService: SidebarService,
              private dialog: MatDialog,
              private router: Router) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }

  addPupil() {
    this.openConfirmationDialog();
  }
  openConfirmationDialog(): void {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(AddPupilGroupComponent, {
      width:'600px',
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

  edit() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(EditUserComponent, {
      width:'600px',
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

  viewGroup() {
    this.router.navigate(['group-details']);
  }
}
