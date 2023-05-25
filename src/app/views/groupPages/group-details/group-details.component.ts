import {Component} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddPupilGroupComponent} from "../../dialogs/add-pupil-group/add-pupil-group.component";
import {EditGroupComponent} from "../../dialogs/edit-group/edit-group.component";
import {Router} from "@angular/router";
import {CreateTimetableComponent} from "../../dialogs/create-timetable/create-timetable.component";

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent {
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
    const dialogRef: MatDialogRef<any> = this.dialog.open(EditGroupComponent, {
      width:'600px',
      height:'400px',
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

  viewUser() {
    this.router.navigate(['user-details']);
  }

  createTimetable() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateTimetableComponent, {
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
}
