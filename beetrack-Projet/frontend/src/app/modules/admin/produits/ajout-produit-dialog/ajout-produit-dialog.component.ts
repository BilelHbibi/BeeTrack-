import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ProduitService } from '../../../services/produit.service';

@Component({
    selector: 'app-ajout-produit-dialog',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule,
        MatDialogModule, MatButtonModule, MatInputModule,
        MatFormFieldModule, MatSelectModule, MatIconModule
    ],
    template: `
    <h2 mat-dialog-title>{{ data.produit ? 'Modifier le produit' : 'Ajouter un produit' }}</h2>
    <mat-dialog-content>
        <form [formGroup]="form" class="flex flex-col gap-4 mt-2 min-w-80">
            <mat-form-field>
                <mat-label>Nom du produit</mat-label>
                <input matInput formControlName="nom" placeholder="Ex: Miel de lavande premium">
                <mat-error>Nom requis</mat-error>
            </mat-form-field>

            <mat-form-field>
                <mat-label>Type</mat-label>
                <mat-select formControlName="type">
                    <mat-option value="miel_fleurs">🍯 Miel de fleurs</mat-option>
                    <mat-option value="miel_thym">🍯 Miel de thym</mat-option>
                    <mat-option value="miel_lavande">🍯 Miel de lavande</mat-option>
                    <mat-option value="miel_acacia">🍯 Miel d'acacia</mat-option>
                    <mat-option value="cire">🕯️ Cire d'abeille</mat-option>
                    <mat-option value="propolis">🌿 Propolis</mat-option>
                    <mat-option value="pollen">🌸 Pollen</mat-option>
                    <mat-option value="autre">Autre</mat-option>
                </mat-select>
            </mat-form-field>

            <mat-form-field>
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="3"
                          placeholder="Décrivez votre produit..."></textarea>
            </mat-form-field>

            <div class="flex gap-4">
                <mat-form-field class="flex-1">
                    <mat-label>Prix (DT/kg)</mat-label>
                    <input matInput type="number" formControlName="prix" min="0">
                    <mat-error>Prix requis</mat-error>
                </mat-form-field>

                <mat-form-field class="flex-1">
                    <mat-label>Stock disponible (kg)</mat-label>
                    <input matInput type="number" formControlName="quantiteDisponible" min="0">
                    <mat-error>Stock requis</mat-error>
                </mat-form-field>
            </div>

            <mat-form-field>
                <mat-label>URL de l'image (optionnel)</mat-label>
                <input matInput formControlName="imageUrl" placeholder="https://...">
            </mat-form-field>
        </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Annuler</button>
        <button mat-flat-button color="primary" [disabled]="form.invalid || loading" (click)="onSave()">
            {{ loading ? 'En cours...' : (data.produit ? 'Modifier' : 'Ajouter') }}
        </button>
    </mat-dialog-actions>
    `
})
export class AjoutProduitDialogComponent implements OnInit {
    form: FormGroup;
    loading = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<AjoutProduitDialogComponent>,
        private fb: FormBuilder,
        private produitService: ProduitService
    ) {}

    ngOnInit(): void {
        const p = this.data.produit;
        this.form = this.fb.group({
            nom: [p?.nom || '', Validators.required],
            type: [p?.type || 'miel_fleurs'],
            description: [p?.description || ''],
            prix: [p?.prix || '', [Validators.required, Validators.min(0)]],
            quantiteDisponible: [p?.quantiteDisponible || '', [Validators.required, Validators.min(0)]],
            imageUrl: [p?.imageUrl || '']
        });
    }

    onSave(): void {
        if (this.form.invalid) return;
        this.loading = true;
        const payload = { ...this.form.value, apiculteurId: this.data.apiculteurId };

        const obs = this.data.produit
            ? this.produitService.update(this.data.produit.id, payload)
            : this.produitService.create(payload);

        obs.subscribe({
            next: () => this.dialogRef.close(true),
            error: () => { this.loading = false; }
        });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
