import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {CreateGroupComponent} from "../../dialogs/create-group/create-group.component";
import {User} from "../../../models/User";
import {UserService} from "../../../service/entityServices/user.service";
import {LanguageService} from "../../../service/translations/language.service";
import {TokenStorageService} from "../../../service/token-storage.service";
import {GroupService} from "../../../service/entityServices/group.service";
import {Group} from "../../../models/Group";

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent implements OnInit{
  currentLang!: string;
  currentUser!: User;

  groups!: Group[];
  constructor(private sidebarService: SidebarService,
              private userService: UserService,
              private groupService: GroupService,
              private languageService: LanguageService,
              private tokenService: TokenStorageService,
              private dialog: MatDialog,
              private router: Router) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }
  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      this.groupService.getGroupsByBranch(this.currentUser.branchId).subscribe(data =>{
        this.groups = data;
      },error => {
        console.log(error);
      })
    })
  }
  groupDetails(group: Group){
    this.router.navigate(['group-details'],{queryParams:
        {id: group.id,
          branchId: this.currentUser.branchId}});
  }

  language(lang:string){
    this.languageService.toggle(lang);
  }
  profile() {
    this.router.navigate(['user-details'],{queryParams: {userId:0}});
  }
  logout() {
    this.tokenService.logOut();
    this.router.navigate(['login'])
  }

}
