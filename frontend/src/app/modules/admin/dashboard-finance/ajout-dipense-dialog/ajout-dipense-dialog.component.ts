// ajout-depense-dialog.component.ts
import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FinanceService } from '../../../services/Finance.service';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-ajout-depense-dialog',
    standalone: true,
    imports: [
        MatInputModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatButtonModule
    ],
    templateUrl: './ajout-dipense-dialog.component.html'
})
export class AjoutDipenseDialogComponent {
    form = this.fb.group({
        categorie: ['', Validators.required],
        montant: [null, Validators.required],
        date: [new Date(), Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private financeService: FinanceService,
        private dialogRef: MatDialogRef<AjoutDipenseDialogComponent>
    ) {}

    onSubmit(): void {
        if (this.form.valid) {
            this.financeService.addDepense(this.form.value).subscribe(() => {
                this.dialogRef.close(true);
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
