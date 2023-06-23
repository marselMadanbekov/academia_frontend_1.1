import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/User";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BranchService} from "../../../service/entityServices/branch.service";
import {UserService} from "../../../service/entityServices/user.service";
import {NotificationService} from "../../../service/notification.service";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";
import {MarkService} from "../../../service/entityServices/mark.service";

@Component({
  selector: 'app-create-mark',
  templateUrl: './create-mark.component.html',
  styleUrls: ['./create-mark.component.scss']
})
export class CreateMarkComponent {
  markForm: FormGroup;
  userId!: number;
  message!: string;
  subjectId!: number;

  constructor(private dialogRef: MatDialogRef<CreateMarkComponent>,
              private markService: MarkService,
              private userService: UserService,
              private notification: NotificationService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) {
    this.markForm = this.createMarkForm();
    this.userId = data.userId;
    this.message = data.message;
    this.subjectId = data.subjectId;

    console.log(this.subjectId + "subjectId");
  }

  createMarkForm(): FormGroup {
    return this.formBuilder.group({
      topic: ['',],
      mark: ['', Validators.compose([Validators.required, Validators.max(10), Validators.min(0)])],
    });
  }

  onSubmit() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
      data: 'Do you want create this branch?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.markService.createMark({
          total_questions: 10,
          topic: this.markForm.value.topic,
          subject:{
            id:this.subjectId,
          },
          correct_answers: this.markForm.value.mark,
          userId: this.userId,
        }).subscribe(data =>{
          console.log(data);
        },error => {
          console.log(error)
        })
      } else {
        console.log("Oh no!")
        this.dialogRef.close();
      }
    });
  }

  ngOnInit(): void {

  }
}
