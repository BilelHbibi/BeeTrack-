import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {RucherService} from "../../../services/rucher.service";
import {rucheService} from "../../../services/ruche.service";


@Component({
  selector: 'app-ajout-ruch-dialog',
  standalone: true,
    imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './ajout-ruch-dialog.component.html',
  styleUrls: ['./ajout-ruch-dialog.component.scss']
})
export class AjoutRuchDialogComponent {
    rucheForm!: FormGroup;
    ruchers: any[] = [];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AjoutRuchDialogComponent>,
        private rucheService: rucheService,
        private rucherService: RucherService,
    ) {}

    ngOnInit(): void {
        this.rucheForm = this.fb.group({
            code: ['', Validators.required],
            type: [''],
            etat: ['Active'],
            rucherId: ['', Validators.required]
        });

        // Charger les ruchers disponibles
        this.rucherService.getAllRuchers().subscribe((res) => {
            this.ruchers = res;
        });
    }

    onSubmit(): void {
        if (this.rucheForm.valid) {
            const formValue = this.rucheForm.value;
            const ruchePayload = {
                code: formValue.code,
                type: formValue.type,
                etat: formValue.etat,
                rucher: {
                    id: formValue.rucherId   // ⚡ on envoie bien { "rucher": { "id": ... } }
                }
            };
            this.rucheService.createruche(ruchePayload).subscribe((res) => {
                this.dialogRef.close(res);
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
