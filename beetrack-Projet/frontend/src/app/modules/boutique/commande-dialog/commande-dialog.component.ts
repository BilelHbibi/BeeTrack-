import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommandeService } from '../../services/commande.service';

@Component({
    selector: 'app-commande-dialog',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule,
        MatDialogModule, MatButtonModule, MatInputModule,
        MatFormFieldModule, MatIconModule
    ],
    template: `
    <h2 mat-dialog-title class="flex items-center gap-2">
        <mat-icon class="text-amber-500">shopping_cart</mat-icon>
        Commander : {{ data.produit.nom }}
    </h2>
    <mat-dialog-content>
        <div class="mb-4 p-3 bg-amber-50 rounded-lg">
            <p class="font-semibold">Prix unitaire : <span class="text-amber-600">{{ data.produit.prix }} DT/kg</span></p>
            <p class="text-sm text-gray-500">Stock disponible : {{ data.produit.quantiteDisponible }} kg</p>
        </div>

        <form [formGroup]="form" class="flex flex-col gap-4 mt-2">
            <mat-form-field>
                <mat-label>Quantité (kg)</mat-label>
                <input matInput type="number" formControlName="quantite" min="1" [max]="data.produit.quantiteDisponible">
                <mat-error *ngIf="form.get('quantite').hasError('required')">Quantité requise</mat-error>
                <mat-error *ngIf="form.get('quantite').hasError('max')">Stock insuffisant</mat-error>
            </mat-form-field>

            <mat-form-field>
                <mat-label>Adresse de livraison</mat-label>
                <input matInput formControlName="adresseLivraison">
                <mat-error>Adresse requise</mat-error>
            </mat-form-field>

            <mat-form-field>
                <mat-label>Téléphone</mat-label>
                <input matInput formControlName="telephone">
                <mat-error>Téléphone requis</mat-error>
            </mat-form-field>

            <div *ngIf="form.get('quantite').value > 0" class="p-3 bg-green-50 rounded-lg">
                <p class="font-bold text-green-700">
                    Total : {{ (form.get('quantite').value * data.produit.prix) | number:'1.2-2' }} DT
                </p>
            </div>
        </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Annuler</button>
        <button mat-flat-button color="primary" [disabled]="form.invalid || loading" (click)="onConfirm()">
            {{ loading ? 'En cours...' : 'Confirmer la commande' }}
        </button>
    </mat-dialog-actions>
    `
})
export class CommandeDialogComponent implements OnInit {
    form: FormGroup;
    loading = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CommandeDialogComponent>,
        private fb: FormBuilder,
        private commandeService: CommandeService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            quantite: [1, [Validators.required, Validators.min(1), Validators.max(this.data.produit.quantiteDisponible)]],
            adresseLivraison: ['', Validators.required],
            telephone: ['', Validators.required]
        });
    }

    onConfirm(): void {
        if (this.form.invalid) return;
        this.loading = true;

        const payload = {
            clientId: this.data.currentUser?.id || this.data.currentUser?.userId,
            produitId: this.data.produit.id,
            quantite: this.form.value.quantite,
            adresseLivraison: this.form.value.adresseLivraison,
            telephone: this.form.value.telephone
        };

        this.commandeService.passer(payload).subscribe({
            next: () => this.dialogRef.close(true),
            error: () => { this.loading = false; }
        });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
