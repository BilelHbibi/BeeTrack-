import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { TacheService } from '../../../services/Tache.service';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-add-tache-dialog',
  standalone: true,
    imports: [CommonModule, MatInputModule, MatDatepickerModule, MatSlideToggleModule, MatDialogModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-tache-dialog.component.html',
  styleUrls: ['./add-tache-dialog.component.scss']
})
export class AddTacheDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddTacheDialogComponent>,
        private tacheService: TacheService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            titre: ['', Validators.required],
            description: ['', Validators.required],
            date: [new Date(), Validators.required],
            accomplie: [false]
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;

        const payload: any = {
            titre: this.form.value.titre,
            description: this.form.value.description,
            date: this.form.value.date,
            accomplie: this.form.value.accomplie
        };

        this.tacheService.createRecolte(payload).subscribe({
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
