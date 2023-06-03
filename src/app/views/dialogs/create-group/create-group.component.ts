import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../../service/entityServices/group.service";
import {User} from "../../../models/User";
import {Subject} from "../../../models/Subject";
import {UserService} from "../../../service/entityServices/user.service";
import {SubjectService} from "../../../service/entityServices/subject.service";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {
  groupForm: FormGroup;
  toBranchId: number;
  message:string;
  subjects!: Subject[];
  teachers!: User[];
  name!: string;
  selectedTeacher!: User;
  selectedSubject!: Subject;

  constructor(private dialogRef: MatDialogRef<CreateGroupComponent>,
              private groupService: GroupService,
              private userService: UserService,
              private subjectService: SubjectService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) {
    this.toBranchId = data.branchId;
    this.message = data.message;
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
    this.groupService.createGroup({
      name: this.name,
      subject: this.selectedSubject,
      teacher:this.selectedTeacher,
    }).subscribe(data =>{
      console.log(data);
    },error => {
      console.log(error);
    });
    this.dialogRef.close();
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe(data =>{
      this.subjects = data;
    },error => {
      console.log(error);
    });
    this.userService.getAllTeachers(this.toBranchId).subscribe(data =>{
      this.teachers = data;
    },error =>{
      console.log(error);
    })
  }
}
