import { Component } from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LanguageService} from "../../service/translations/language.service";
import {CreateBranchComponent} from "../dialogs/create-branch/create-branch.component";
import {BranchService} from "../../service/entityServices/branch.service";
import {Branch} from "../../models/Branch";
import {NotificationService} from "../../service/notification.service";
import {GeneralInfo} from "../../models/GeneralInfo";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent {
  currentLang!: string;
  genelar!: GeneralInfo;
  branches !: Branch[];


  constructor(private sidebarService: SidebarService,
              private dialog: MatDialog,
              private languageService: LanguageService,
              private tokenStorage: TokenStorageService,
              private route: Router,
              private branchService: BranchService,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.branchService.getMainGeneralInfo().subscribe(data => {
      this.genelar = data;
    })
    this.branchService.getBranches().subscribe(data =>{
      this.branches = data;
      console.log(data);
    },error => {
      console.log(error);
      this.notification.showSnackBar(error);
    })
  }
  sidebarToggle() {
    this.sidebarService.toggle();
  }

  logout() {
    this.tokenStorage.logOut();
    this.route.navigate(['login'])
  }

  language(lang:string){
    this.languageService.toggle(lang);
  }
  createBranch() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateBranchComponent, {
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
