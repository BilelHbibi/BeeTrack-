import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RecolteService } from '../../../services/Recolte.service';
import { RucherService } from '../../../services/rucher.service';
@Component({
  selector: 'app-add-recolte-dialog',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-recolte-dialog.component.html',
  styleUrls: ['./add-recolte-dialog.component.scss']
})
export class AddRecolteDialogComponent {
    recolteForm: FormGroup;
    ruchers: any[] = [];

    constructor(
        private fb: FormBuilder,
        private recolteService: RecolteService,
        private rucherService: RucherService,
        public dialogRef: MatDialogRef<AddRecolteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.recolteForm = this.fb.group({
            date: [new Date(), Validators.required],
            typeMiel: ['', Validators.required],
            quantite: [null, [Validators.required, Validators.min(0)]],
            observation: [''],
            rucherId: [null, Validators.required]
        });

        this.loadRuchers();
    }

    loadRuchers() {
        this.rucherService.getAllRuchers().subscribe({
            next: (res) => (this.ruchers = res),
            error: (err) => console.error(err),
        });
    }

    submit() {
        if (this.recolteForm.invalid) return;

        const payload = {
            ...this.recolteForm.value,
            rucher: { id: this.recolteForm.value.rucherId },
        };

        this.recolteService.createRecolte(payload).subscribe({
            next: (res) => this.dialogRef.close(res),
            error: (err) => console.error(err),
        });
    }

    close() {
        this.dialogRef.close();
    }
}
