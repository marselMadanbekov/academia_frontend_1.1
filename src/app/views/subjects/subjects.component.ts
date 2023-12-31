import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateSubjectComponent} from "../dialogs/create-subject/create-subject.component";
import {SubjectService} from "../../service/entityServices/subject.service";
import {Subject} from "../../models/Subject";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationAlertComponent} from "../dialogs/confirmation-alert/confirmation-alert.component";
import {Group} from "../../models/Group";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit{
  subjects!: Subject[];
  branchId!: number;

  myControl = new FormControl<string | Subject>('');
  filteredOptions!: Observable<Subject[]>;
  constructor(private sidebarService: SidebarService,
              private subjectService: SubjectService,
              private activatedRoute: ActivatedRoute,
              private notification: NotificationService,
              private dialog: MatDialog) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.branchId = param['id'];
      console.log(param);
    })
  }

  getClassByIndex(): string {
    const index = Math.floor(Math.random()*4);
    const classes = ['bg-warning', 'bg-info', 'bg-success', 'bg-primary'];
    const classIndex = index % classes.length;
    return classes[classIndex];
  }
  ngOnInit(): void {
    this.refreshData();
  }

  refreshData():void{
    this.subjectService.getSubjectsByBranch(this.branchId).subscribe(data =>{
      this.subjects = data;
      console.log(data);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.subjects.slice();
        })
      );
    },error => {
      console.log(error);
    })
  }
  sidebarToggle() {
    this.sidebarService.toggle();
  }

  createSubject() {
    console.log("Hello arert is coming")
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateSubjectComponent, {
      width:'300px',
      data: {
        branchId: this.branchId
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }
  displayFn(subject: Subject): string {
    return subject && subject.name ? subject.name : '';
  }
  private _filter(name: string): Subject[] {
    const filterValue = name.toLowerCase();
    return this.subjects.filter(branch => branch.name.toLowerCase().includes(filterValue));
  }

  deleteSubject(subject: Subject) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width:'250px',
      data: 'Do you want create this branch?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
        this.subjectService.deleteSubject(subject.id).subscribe(data =>{
          console.log(data);
          this.notification.showSnackBar(data);
          this.refreshData();
        },error => {
          this.notification.showSnackBar(error);
        })
      } else {
        console.log("Oh no!")
      }
    });
  }
}
