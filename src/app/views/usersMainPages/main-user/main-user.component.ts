import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {CreateGroupComponent} from "../../dialogs/create-group/create-group.component";
import {User} from "../../../models/User";
import {UserService} from "../../../service/entityServices/user.service";
import {LanguageService} from "../../../service/translations/language.service";
import {TokenStorageService} from "../../../service/token-storage.service";

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent implements OnInit{
  currentLang!: string;
  currentUser!: User;
  constructor(private sidebarService: SidebarService,
              private userService: UserService,
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
    })
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
