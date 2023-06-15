import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateUserComponent} from "../dialogs/create-user/create-user.component";
import {ActivatedRoute, Router} from "@angular/router";
import {BranchService} from "../../service/entityServices/branch.service";
import {Branch} from "../../models/Branch";
import {NotificationService} from "../../service/notification.service";
import {User} from "../../models/User";
import {LanguageService} from "../../service/translations/language.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/entityServices/user.service";

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent implements OnInit{
  branchId!: number;
  branch!: Branch;
  currentLang!: string;
  currentUser!: User;

  constructor(private sidebarService: SidebarService,
              private branchService: BranchService,
              private languageService: LanguageService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private userService: UserService,
              private notification: NotificationService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.branchId = param['id'];

    })
  }

  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang =>{
      this.currentLang = lang;
    })
    this.userService.getCurrentUser().subscribe(data =>{
      this.currentUser = data;
    })
    this.refreshData();
  }
  refreshData():void{
    this.branchService.getBranchDetails(this.branchId).subscribe(data => {
      this.branch = data;
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
    this.router.navigate(['branch-details/subjects'],{queryParams: {id: this.branch.id}});
  }

  routeToPupils() {
    this.router.navigate(['branch-details/pupils'],{queryParams: {id: this.branch.id}});
  }
  routeToGroups() {
    this.router.navigate(['branch-details/groups'],{queryParams: {id: this.branch.id}});
  }

  routeToTeachers() {
    this.router.navigate(['branch-details/teachers'],{queryParams:{id: this.branch.id}});
  }

  viewUser(admin: User | undefined) {
    this.router.navigate(['user-details'],{
      queryParams:
        {userId: admin?.id}
    });
  }

  language(lang: string) {
    this.languageService.toggle(lang);
  }
  profile() {
    this.router.navigate(['user-details'],{queryParams: {userId:0}});
  }
  logout() {
    this.tokenStorage.logOut();
    this.router.navigate(['login'])
  }
}
