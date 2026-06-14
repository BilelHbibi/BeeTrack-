import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { TacheService } from '../../../services/Tache.service';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-update-tache-dialog',
  standalone: true,
    imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatSlideToggleModule, MatButtonModule],
  templateUrl: './update-tache-dialog.component.html',
  styleUrls: ['./update-tache-dialog.component.scss']
})
export class UpdateTacheDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UpdateTacheDialogComponent>,
        private tacheService: TacheService,
        @Inject(MAT_DIALOG_DATA) public data: any // contient la tâche à modifier
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            titre: [this.data?.titre || '', Validators.required],
            description: [this.data?.description || '', Validators.required],
            date: [this.data?.date ? new Date(this.data.date) : new Date(), Validators.required],
            accomplie: [this.data?.accomplie || false]
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;

        const payload: any = {
            id: this.data.id, // garder l'id pour l'update
            titre: this.form.value.titre,
            description: this.form.value.description,
            date: this.form.value.date,
            accomplie: this.form.value.accomplie
        };

        this.tacheService.updateRecolte(payload.id, payload).subscribe({
            next: () => this.dialogRef.close(true),
            error: (err) => {
                console.error(err);
                this.dialogRef.close(false);
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
