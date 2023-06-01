import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateSubjectComponent} from "../dialogs/create-subject/create-subject.component";
import {SubjectService} from "../../service/entityServices/subject.service";
import {Subject} from "../../models/Subject";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit{
  subjects!: Subject[];

  constructor(private sidebarService: SidebarService,
              private subjectService: SubjectService,
              private notification: NotificationService,
              private dialog: MatDialog) {
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
    this.subjectService.getAllSubjects().subscribe(data =>{
      this.subjects = data;
      this.notification.showSnackBar("Successfully");
    },error => {
      this.notification.showSnackBar(error);
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
      data: 'Save, attendance?',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }
}
