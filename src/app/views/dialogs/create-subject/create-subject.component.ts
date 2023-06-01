import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";
import {SubjectService} from "../../../service/entityServices/subject.service";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent {
  subjectForm: FormGroup;
  name!: string;

  constructor(private dialogRef: MatDialogRef<CreateSubjectComponent>,
              private subjectService: SubjectService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private formBuilder: FormBuilder) {
    this.subjectForm = this.createGroupForm();
  }

  createGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      cost_per_lesson:[''],
    });
  }

  onSubmit() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width:'250px',
      data: 'Do you want create this branch?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("YES confirmed");
        this.subjectService.createSubject({
          name: this.subjectForm.value.name,
          cost_per_lesson: this.subjectForm.value.cost_per_lesson,
        }).subscribe(data =>{
          console.log(data);
        })
        this.dialogRef.close();
      } else {
        console.log("Oh no!")
        this.dialogRef.close();
      }
    });
  }

  ngOnInit(): void {
    // this.subjectService.getAllSubjects().subscribe(data =>{
    //   this.subjects = data;
    // },error => {
    //   console.log(error);
    // });
    // this.userService.getAllTeachers().subscribe(data =>{
    //   this.teachers = data;
    // },error =>{
    //   console.log(error);
    // })
  }
}
