import { Component } from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LanguageService} from "../../../service/translations/language.service";
import {CreateBranchComponent} from "../../dialogs/create-branch/create-branch.component";
import {BranchService} from "../../../service/entityServices/branch.service";
import {Branch} from "../../../models/Branch";
import {NotificationService} from "../../../service/notification.service";
import {GeneralInfo} from "../../../models/GeneralInfo";
import {TokenStorageService} from "../../../service/token-storage.service";
import {Router} from "@angular/router";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {UserService} from "../../../service/entityServices/user.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent {
  currentLang!: string;
  currentUser!: User;
  genelar!: GeneralInfo;

  branches !: Branch[];
  myControl = new FormControl<string | Branch>('');
  filteredOptions!: Observable<Branch[]>;

  constructor(private sidebarService: SidebarService,
              private userService: UserService,
              private dialog: MatDialog,
              private languageService: LanguageService,
              private tokenStorage: TokenStorageService,
              private route: Router,
              private branchService: BranchService,
              private notification: NotificationService) {
    this.userService.getCurrentUser().subscribe(data =>{
        this.currentUser = data;
      }
    )
  }

  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.refreshData();
  }

  branchDetails(branch: Branch){
    const queryParams = { id: branch.id};
    this.route.navigate(['/branch-details'], {queryParams:{id:branch.id}});
  }

  refreshData():void{
    this.branchService.getMainGeneralInfo().subscribe(data => {
      this.genelar = data;
    })
    this.branchService.getBranches().subscribe(data =>{
      this.branches = data;
      console.log(data);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.branches.slice();
        })
      );
    },error => {
      console.log(error);
      this.notification.showSnackBar(error);
    })
  }
  displayFn(branch: Branch): string {
    return branch && branch.name ? branch.name : '';
  }
  private _filter(name: string): Branch[] {
    const filterValue = name.toLowerCase();
    return this.branches.filter(branch => branch.name.toLowerCase().includes(filterValue));
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
      this.refreshData();
    });
  }
}
