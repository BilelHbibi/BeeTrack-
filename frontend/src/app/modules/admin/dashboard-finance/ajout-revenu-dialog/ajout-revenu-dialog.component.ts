// src/app/features/finance/components/revenu-dialog/revenu-dialog.component.ts

import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {  FinanceService } from '../../../services/Finance.service';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
    selector: 'app-revenu-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    templateUrl: './ajout-revenu-dialog.component.html'
})
export class AjoutRevenuDialogComponent {
    revenuForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private financeService: FinanceService,
        public dialogRef: MatDialogRef<AjoutRevenuDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { revenu?: any }
    ) {
        this.revenuForm = this.fb.group({
            description: [data?.revenu?.description || '', Validators.required],
            montant: [data?.revenu?.montant || '', [Validators.required, Validators.min(1)]],
            date: [data?.revenu?.date || new Date().toISOString().substring(0, 10), Validators.required]
        });
    }

    onSave(): void {
        if (this.revenuForm.valid) {
            const revenu: any = this.revenuForm.value;
            if (this.data?.revenu) {
                this.financeService.updateRevenu(this.data.revenu.id!, revenu).subscribe(() => {
                    this.dialogRef.close(true);
                });
            } else {
                this.financeService.addRevenu(revenu).subscribe(() => {
                    this.dialogRef.close(true);
                });
            }
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}

AjoutRevenuDialogComponent
