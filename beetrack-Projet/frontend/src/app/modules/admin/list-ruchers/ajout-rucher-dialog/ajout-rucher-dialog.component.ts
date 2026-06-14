import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {RucherService} from "../../../services/rucher.service";

@Component({
    selector: 'app-ajout-rucher-dialog',
    templateUrl: './ajout-rucher-dialog.component.html',
    imports: [
        MatInputModule,
        ReactiveFormsModule,
        NgIf,
        MatButtonModule
    ],
    standalone: true
})
export class AjoutRucherDialogComponent {
    rucherForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AjoutRucherDialogComponent>,
        private rucherService: RucherService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.rucherForm = this.fb.group({
            nom: ['', Validators.required],
            localisation: ['', Validators.required],
        });
    }

    onSave(): void {
        if (this.rucherForm.valid) {
            this.rucherService.createRucher(this.rucherForm.value).subscribe(()=>{
                this.dialogRef.close(this.rucherForm.value);

            })
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
