import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddPupilGroupComponent} from "../../dialogs/add-pupil-group/add-pupil-group.component";
import {EditGroupComponent} from "../../dialogs/edit-group/edit-group.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateTimetableComponent} from "../../dialogs/create-timetable/create-timetable.component";
import {Group} from "../../../models/Group";
import {GroupService} from "../../../service/entityServices/group.service";
import {CreateUserComponent} from "../../dialogs/create-user/create-user.component";
import {User} from "../../../models/User";
import {ConfirmationAlertComponent} from "../../dialogs/confirmation-alert/confirmation-alert.component";
import {LanguageService} from "../../../service/translations/language.service";
import {UserService} from "../../../service/entityServices/user.service";
import {TokenStorageService} from "../../../service/token-storage.service";
import {MarkService} from "../../../service/entityServices/mark.service";
import {CreateMarkComponent} from "../../dialogs/create-mark/create-mark.component";

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  groupId!: number;
  branchId!: number;
  currentLang!: string;
  currentUser!: User;
  group!: Group;
  mark: number = 0;
  showMarksCol: boolean = false;

  constructor(private sidebarService: SidebarService,
              private activatedRoute: ActivatedRoute,
              private groupService: GroupService,
              private languageService: LanguageService,
              private userService: UserService,
              private tokenStorage: TokenStorageService,
              private markService: MarkService,
              private dialog: MatDialog,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe(param => {
      console.log(param);
      this.groupId = param['id'];
      this.branchId = param['branchId'];
    })
  }

  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
    this.userService.getCurrentUser().subscribe(data => {
      this.currentUser = data;
    })
    this.refreshData();
  }

  refreshData(): void {
    this.groupService.getGroupById(this.groupId).subscribe(data => {
      this.group = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }

  addPupil() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(AddPupilGroupComponent, {
      width: '600px',
      data: {
        groupId: this.groupId,
        branchId: this.group.branchId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  edit() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(EditGroupComponent, {
      width: '600px',
      height: '400px',
      data: {
        groupId: this.groupId,
        branchId: this.branchId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  viewUser(pupil: User) {
    this.router.navigate(['user-details'], {
      queryParams:
        {userId: pupil.id}
    });
  }

  createTimetable() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateTimetableComponent, {
      width: '600px',
      data: this.groupId,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }


  createPupil() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateUserComponent, {
      width: '600px',
      data: {
        role: 4,
        groupId: this.group.id,
        branchId: undefined,
        lang: 'ru',
        message: 'Create new Pupil'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  removePupil(pupil: User) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
      data: 'Remove ' + pupil.firstname + " " + pupil.lastname + " from this group?",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.removePupilFromGroup(this.groupId, pupil.id).subscribe(data => {
          this.refreshData();
        }, error => {
          console.log(error);
        })
      } else {
        console.log("Oh no!")
      }
    });
  }

  attendance() {
    this.router.navigate(['attendance'], {queryParams: {groupId: this.groupId}});
  }

  language(lang: string) {
    this.languageService.toggle(lang);
  }

  profile() {
    this.router.navigate(['user-details'], {queryParams: {userId: 0}});
  }

  logout() {
    this.tokenStorage.logOut();
    this.router.navigate(['login'])
  }

  saveMark(pupil: User) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateMarkComponent, {
      width: '250px',
      data: {
        message: "" + pupil.firstname + " " + pupil.lastname,
        userId: pupil.id,
        subjectId: this.group.subject?.id,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.removePupilFromGroup(this.groupId, pupil.id).subscribe(data => {
          this.refreshData();
        }, error => {
          console.log(error);
        })
      } else {
        console.log("Oh no!")
      }
    });
  }
}
