import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateUserComponent} from "../dialogs/create-user/create-user.component";
import {CreateBranchComponent} from "../dialogs/create-branch/create-branch.component";
import {LanguageService} from "../../service/translations/language.service";
import {TranslationService} from "../../service/translations/translation.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  currentLang!: string;
  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }


  constructor(private sidebarService: SidebarService,
              private dialog: MatDialog,
              private languageService: LanguageService,) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
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
