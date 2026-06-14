import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { RecolteService } from '../../../services/Recolte.service';
import { RucherService } from '../../../services/rucher.service';
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-update-recolte-dialog',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule],
  templateUrl: './update-recolte-dialog.component.html',
  styleUrls: ['./update-recolte-dialog.component.scss']
})
export class UpdateRecolteDialogComponent {

    recolteForm: FormGroup;
    ruchers: any[] = [];

    constructor(
        private fb: FormBuilder,
        private recolteService: RecolteService,
        private rucherService: RucherService,
        private dialogRef: MatDialogRef<UpdateRecolteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        let dateValue = '';
        if (this.data.date) {
            const d = new Date(this.data.date);
            const month = ('0' + (d.getMonth() + 1)).slice(-2);
            const day = ('0' + d.getDate()).slice(-2);
            const year = d.getFullYear();
            dateValue = `${year}-${month}-${day}`;
        }

        this.recolteForm = this.fb.group({
            date: [dateValue, Validators.required], // string YYYY-MM-DD
            typeMiel: [this.data.typeMiel, Validators.required],
            quantite: [this.data.quantite, Validators.required],
            observation: [this.data.observation],
            rucherId: [this.data.rucher?.id, Validators.required],
        });

        this.loadRuchers();
    }
    formatDate(date: any): string {
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

    loadRuchers() {
        this.rucherService.getAllRuchers().subscribe({
            next: (res: any) => this.ruchers = res,
            error: (err: any) => console.error(err)
        });
    }

    updateRecolte() {
        if (this.recolteForm.invalid) return;

        const updatedRecolte: any = {
            ...this.data,
            ...this.recolteForm.value,
            rucher: this.ruchers.find(r => r.id === this.recolteForm.value.rucherId)
        };

        this.recolteService.updateRecolte(this.data.id,updatedRecolte).subscribe({
            next: () => this.dialogRef.close(true),
            error: (err: any) => console.error(err)
        });
    }

    closeDialog() {
        this.dialogRef.close(false);
    }

}
