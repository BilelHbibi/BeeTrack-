import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InterventionService } from '../../../services/intervention.service';
import {rucheService} from "../../../services/ruche.service";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-add-inspectione-dialog',
  standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule, MatDatepickerModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-inspectione-dialog.component.html',
  styleUrls: ['./add-inspectione-dialog.component.scss']
})
export class AddInspectioneDialogComponent {
    form: FormGroup;
    ruches: any[] = []; // liste des ruches pour le select

    constructor(
        private dialogRef: MatDialogRef<AddInspectioneDialogComponent>,
        private fb: FormBuilder,
        private _interventionService: InterventionService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ruchesService:rucheService
    ) {
        this.form = this.fb.group({
            date: [new Date(), Validators.required],
            remarque: ['', Validators.required],
            rucheId: [null, Validators.required],
        });
    }

    ngOnInit(): void {
        // récupérer la liste des ruches
        this.ruchesService.getAllruches().subscribe((res: any[]) => {
            this.ruches = res;
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;

        const payload: any = {
            date: this.form.value.date,
            remarque: this.form.value.remarque,
            ruche: { id: this.form.value.rucheId } // relation vers la ruche
        };

        this._interventionService.createRecolte(payload).subscribe({
            next: () => this.dialogRef.close(true),
            error: (err) => console.error(err)
        });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
