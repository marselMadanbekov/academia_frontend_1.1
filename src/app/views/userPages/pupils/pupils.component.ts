import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../../service/sidebar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../service/entityServices/user.service";
import {User} from "../../../models/User";
import {CreateUserComponent} from "../../dialogs/create-user/create-user.component";
import {ConfirmationAlertComponent} from "../../dialogs/confirmation-alert/confirmation-alert.component";
import {NotificationService} from "../../../service/notification.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.component.html',
  styleUrls: ['./pupils.component.scss']
})
export class PupilsComponent implements OnInit{
  branchId!: number;
  pupils!: User[];

  myControl = new FormControl<string | User>('');
  filteredOptions!: Observable<User[]>;
  constructor(private sidebarService: SidebarService,
              private activatedRoute: ActivatedRoute,
              private notification: NotificationService,
              private router: Router,
              private userService: UserService,
              private dialog: MatDialog,
  ) {
    this.activatedRoute.queryParams.subscribe(param => {
        this.branchId = param['id'];
      }
    )
  }
  ngOnInit(): void {
    this.refreshData();
  }

  refreshData():void{
    this.userService.getPupilsByBranch(this.branchId).subscribe(data =>{
      this.pupils = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.firstname;
          return name ? this._filter(name as string) : this.pupils.slice();
        })
      );
    })
  }
  sidebarToggle() {
    this.sidebarService.toggle();
  }

  createUser() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateUserComponent, {
      width:'600px',
      data: {
        role: 4,
        branchId: this.branchId,
        lang: 'ru',
        message: 'Create new Pupil'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  displayFn(pupil: User): string {
    return pupil && pupil.firstname ? pupil.firstname : '';
  }
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.pupils.filter(user => (user.firstname.toLowerCase().includes(filterValue) || user.lastname.toLowerCase().includes(filterValue) && user.active));
  }
  pupilDelete(pupil: User) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width:'250px',
      data: 'Do you want create this pupil?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
        this.userService.deleteUser(pupil.id).subscribe(data =>{
          console.log(data);
          this.notification.showSnackBar('successfully deleted');
          this.refreshData();
        },error => {
          this.notification.showSnackBar(error);
        })
      } else {
        console.log("Oh no!")
      }
    });
  }

  viewUser(pupil: User) {
    this.router.navigate(['user-details'],{
      queryParams:
        {userId: pupil.id}
    });
  }
}
