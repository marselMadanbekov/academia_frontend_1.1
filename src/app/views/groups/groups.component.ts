import {Component} from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateUserComponent} from "../dialogs/create-user/create-user.component";
import {CreateGroupComponent} from "../dialogs/create-group/create-group.component";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
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
