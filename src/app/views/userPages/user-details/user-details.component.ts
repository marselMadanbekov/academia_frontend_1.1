import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddPupilGroupComponent} from "../../dialogs/add-pupil-group/add-pupil-group.component";
import {ActivatedRoute, Router} from "@angular/router";
import {EditUserComponent} from "../../dialogs/edit-user/edit-user.component";
import {User} from "../../../models/User";
import {UserService} from "../../../service/entityServices/user.service";
import {Group} from "../../../models/Group";
import {UpBalanceComponent} from "../../dialogs/up-balance/up-balance.component";
import {TokenStorageService} from "../../../service/token-storage.service";
import {LanguageService} from "../../../service/translations/language.service";
import {Subject} from "../../../models/Subject";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  currentLang: string = 'kg';
  currentUser!: User;
  user!: User;
  selectedSubject!: Subject;

  constructor(private sidebarService: SidebarService,
              private activatedRoute: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private languageService: LanguageService,
              private userService: UserService,
              private dialog: MatDialog,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.userId = param['userId'];
      console.log(this.userId);
    })
  }

  language(lang:string){
    this.languageService.toggle(lang);
  }
  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.userService.getCurrentUser().subscribe(data =>{
      this.currentUser = data;
    })
    this.refreshData();
  }

  refreshData(): void {
    console.log(this.userId == 0);
    if (this.userId == 0) {
      this.userService.getProfile().subscribe(data => {
        this.user = data;
      }, error => {
        console.log(error);
      })
    } else {
      this.userService.getUserById(this.userId).subscribe(data => {
        this.user = data;
        console.log(data);
      }, error => {
        console.log(error);
      })
    }
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }



  edit() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(EditUserComponent, {
      width: '600px',
      data: this.userId,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  viewGroup(group: Group) {
    console.log(group.id)
    this.router.navigate(['group-details'],
      {
        queryParams:
          {
            id: group.id,
            branchId: group.branchId,
          }
      });
  }

  balanceUp() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(UpBalanceComponent, {
      width: '300px',
      data: this.user.id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }
  logout() {
    this.tokenStorage.logOut();
    this.router.navigate(['login'])
  }

  profile() {
    this.userId = 0;
    this.refreshData();
  }
}
