import { Component } from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {CreateGroupComponent} from "../../dialogs/create-group/create-group.component";

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent {
  constructor(private sidebarService: SidebarService,
              private dialog: MatDialog,
              private router: Router) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }
  groupDetails(){
    this.router.navigate(['group-details']);
  }

  createGroup() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateGroupComponent, {
      width:'300px',
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
}
