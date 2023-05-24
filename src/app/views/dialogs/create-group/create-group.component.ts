import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {
  groupForm: FormGroup;
  // teachers!: User[];
  // subjects!: Subject[];
  //
  name!: string;
  // selectedTeacher!: User;
  // selectedSubject!: Subject;

  constructor(private dialogRef: MatDialogRef<CreateGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private formBuilder: FormBuilder) {
    this.groupForm = this.createGroupForm();
  }

  createGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      subject:[''],
      teacher:[''],
    });
  }

  onSubmit() {
    // this.groupService.createGroup({
    //   name: this.name,
    //   subject: this.selectedSubject,
    //   teacher:this.selectedTeacher,
    // }).subscribe(data =>{
    //   console.log(data);
    // },error => {
    //   console.log(error);
    // });
    // this.dialogRef.close();
    this.dialogRef.close();
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
