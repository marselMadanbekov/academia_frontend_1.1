import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";
import {User} from "../../../models/User";
import {Subject} from "../../../models/Subject";
import {GroupService} from "../../../service/entityServices/group.service";
import {UserService} from "../../../service/entityServices/user.service";
import {SubjectService} from "../../../service/entityServices/subject.service";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  selectedTeacher!: User | null;
  selectedSubject!: Subject | null;

  teachers!: User[];
  subjects!: Subject[];

  branchId: number;
  groupId: number;

  myControl = new FormControl<string | User>('');
  myControl1 = new FormControl<string | Subject>('');
  filteredTeachers!: Observable<User[]>;
  filteredSubjects!: Observable<Subject[]>;

  constructor(
    public dialogRef: MatDialogRef<EditGroupComponent>,
    private groupService: GroupService,
    private userService: UserService,
    private subjectService: SubjectService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.branchId = data.branchId;
    this.groupId = data.groupId;
  }

  ngOnInit(): void {
    this.userService.getTeachersByBranch(this.branchId).subscribe(data => {
      this.teachers = data;
      this.filteredTeachers = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.firstname;
          return name ? this._filter(name as string) : this.teachers.slice();
        })
      );
      console.log(data);
    }, error => {
      console.log(error);
    })
    this.subjectService.getSubjectsByBranch(this.branchId).subscribe(data => {
      this.subjects = data;
      this.filteredSubjects = this.myControl1.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filterSubject(name as string) : this.subjects.slice();
        })
      );
      console.log(data);
    }, error => {
      console.log(error);
    })
  }



  displayFn(pupil: User): string {
    return pupil && pupil.firstname ? pupil.firstname : '';
  }

  displayFnSubject(subject: Subject): string {
    return subject && subject.name ? subject.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.teachers.filter(user => user.firstname.toLowerCase().includes(filterValue));
  }

  private _filterSubject(name: string): Subject[] {
    const filterValue = name.toLowerCase();
    return this.subjects.filter(subject => subject.name.toLowerCase().includes(filterValue));
  }

  save() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
      data: 'Save, changes?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.editGroupById(this.groupId, {
          subject: this.selectedSubject,
          teacher: this.selectedTeacher,
        }).subscribe(data => {
          console.log(data);
          this.dialogRef.close();
        }, error => {
          console.log()
        })
      } else {
        console.log("Oh no!")
        this.dialogRef.close();
      }
    });
  }

}
