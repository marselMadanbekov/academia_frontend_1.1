import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchService} from "../../../service/entityServices/branch.service";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent {
  branchForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<CreateBranchComponent>,
              private branchService: BranchService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private formBuilder: FormBuilder) {
    this.branchForm = this.createGroupForm();
  }

  createGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      owner:[''],
      town:[''],
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
        this.branchService.createBranch({
          name: this.branchForm.value.name,
          town: this.branchForm.value.town,
        }).subscribe(data =>{
          console.log(data);
        })
        this.dialogRef.close();
      } else {
        console.log("Oh no!")
        this.dialogRef.close();
      }
    });


    this.dialogRef.close();
  }
}
