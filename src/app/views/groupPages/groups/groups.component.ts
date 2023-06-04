import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateGroupComponent} from "../../dialogs/create-group/create-group.component";
import {Group} from "../../../models/Group";
import {GroupService} from "../../../service/entityServices/group.service";
import {ConfirmationAlertComponent} from "../../dialogs/confirmation-alert/confirmation-alert.component";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit{
  branchId!: number;
  groups!: Group[]

  constructor(private sidebarService: SidebarService,
              private groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              private notification: NotificationService,
              private dialog: MatDialog,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.branchId = param['id'];

    })
  }
  ngOnInit(): void {
    this.refreshData();
  }
  refreshData(): void{
    this.groupService.getGroupsByBranch(this.branchId).subscribe(data =>{
      this.groups = data;
      console.log(data);
    })
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
      data: {
        branchId: this.branchId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  deleteGroup(group: Group):void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width:'250px',
      data: 'Do you want delete this group?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
        this.groupService.deleteGroup(group.id).subscribe(data =>{
          console.log(data);
          this.notification.showSnackBar(data);
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
