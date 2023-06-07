import {Component} from '@angular/core';
import {Branch} from "../../../models/Branch";
import {SidebarService} from "../../../service/sidebar.service";
import {BranchService} from "../../../service/entityServices/branch.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateUserComponent} from "../../dialogs/create-user/create-user.component";
import {User} from "../../../models/User";
import {UserService} from "../../../service/entityServices/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  branch!: Branch;
  currentUser!: User;

  constructor(private sidebarService: SidebarService,
              private branchService: BranchService,
              private userService: UserService,
              private router: Router,
              private notification: NotificationService,
              private dialog: MatDialog) {
    this.userService.getCurrentUser().subscribe(data =>{
        this.currentUser = data;
      }
    )
  }

  ngOnInit(): void {
    this.refreshData();
  }
  refreshData():void{
    this.branchService.getBranchCurrentAdmin().subscribe(data => {
      this.branch = data;
      this.routeToPupils();
      console.log(data);
    }, error => {
      this.notification.showSnackBar(error);
      console.log(error);
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
      this.refreshData();
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
      this.refreshData();
    });
  }

  routeToSubject() {
    this.router.navigate(['admin/subjects'],{queryParams: {id: this.branch.id}});
  }

  routeToPupils() {
    this.router.navigate(['admin/pupils'],{queryParams: {id: this.branch.id}});
  }
  routeToGroups() {
    this.router.navigate(['admin/groups'],{queryParams: {id: this.branch.id}});
  }

  routeToTeachers() {
    this.router.navigate(['admin/teachers'],{queryParams:{id: this.branch.id}});
  }
}
