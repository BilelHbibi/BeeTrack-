import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RucherService} from "../../../services/rucher.service";

@Component({
    selector: 'app-update-rucher-dialog',
    templateUrl: './update-rucher-dialog.component.component.html',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
    ],
    standalone: true
})
export class UpdateRucherDialogComponent {
    rucherForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UpdateRucherDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private rucherService:RucherService,
    ) {
        this.rucherForm = this.fb.group({
            nom: [data.nom, Validators.required],
            localisation: [data.localisation, Validators.required],
        });
    }

    onSave(): void {
        if (this.rucherForm.valid) {
            this.rucherService.updateRucher(this.data.id,this.rucherForm.value).subscribe(
                data => {
                    this.dialogRef.close(this.rucherForm.value);

                }
            )
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
