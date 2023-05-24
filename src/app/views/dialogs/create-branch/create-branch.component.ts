import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent {
  branchForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<CreateBranchComponent>,
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

    this.dialogRef.close();
  }
}
