import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { RucherService } from '../../../services/rucher.service';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {rucheService} from "../../../services/ruche.service";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-update-ruche-dialog',
    templateUrl: './update-ruche-dialog.component.html',
    standalone: true,
    imports: [
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgForOf,
        MatDialogModule
    ],
    styleUrls: ['./update-ruche-dialog.component.scss']
})
export class UpdateRucheDialogComponent implements OnInit {
    form!: FormGroup;
    ruchers: any[] = []; // Liste des ruchers disponibles

    constructor(
        private fb: FormBuilder,
        private rucheService: rucheService,
        private rucherService: RucherService,
        private dialogRef: MatDialogRef<UpdateRucheDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        // Charger la liste des ruchers
        this.rucherService.getAllRuchers().subscribe(r => (this.ruchers = r));
        console.log("dsdssdds",this.ruchers);
        // Créer le form avec les valeurs existantes
        this.form = this.fb.group({
            code: [this.data.code, Validators.required],
            type: [this.data.type],
            etat: [this.data.etat],
            rucherId: [this.data.rucher?.id, Validators.required]
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;

        const formValue = this.form.value;

        const ruchePayload = {
            code: formValue.code,
            type: formValue.type,
            etat: formValue.etat,
            rucher: {
                id: formValue.rucherId
            }
        };

        this.rucheService.updateruche(this.data.id, ruchePayload).subscribe({
            next: () => this.dialogRef.close(true),
            error: (err) => console.error(err)
        });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
