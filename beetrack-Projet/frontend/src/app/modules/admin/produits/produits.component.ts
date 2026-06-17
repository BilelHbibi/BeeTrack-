import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { ProduitService } from '../../services/produit.service';
import { AuthService } from 'app/core/auth/auth.service';
import { AjoutProduitDialogComponent } from './ajout-produit-dialog/ajout-produit-dialog.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-produits',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule,
        MatCardModule, MatButtonModule, MatIconModule,
        MatInputModule, MatFormFieldModule, MatSelectModule,
        MatDialogModule, MatSnackBarModule, MatTableModule, MatChipsModule
    ],
    templateUrl: './produits.component.html',
})
export class ProduitsComponent implements OnInit {
    produits: any[] = [];
    loading = true;
    currentUser: any;
    displayedColumns = ['nom', 'type', 'prix', 'stock', 'actions'];

    constructor(
        private produitService: ProduitService,
        private authService: AuthService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private fuseConfirmation: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.currentUser = this.authService.getDecodedToken();
        this.loadProduits();
    }

    loadProduits(): void {
        const id = this.currentUser?.id || this.currentUser?.userId;
        this.loading = true;
        this.produitService.getByApiculteur(id).subscribe({
            next: (data) => { this.produits = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    ajouterProduit(): void {
        const ref = this.dialog.open(AjoutProduitDialogComponent, {
            width: '500px',
            data: { apiculteurId: this.currentUser?.id || this.currentUser?.userId }
        });
        ref.afterClosed().subscribe(result => {
            if (result) {
                this.snackBar.open('Produit ajouté !', 'Fermer', { duration: 3000 });
                this.loadProduits();
            }
        });
    }

    modifierProduit(produit: any): void {
        const ref = this.dialog.open(AjoutProduitDialogComponent, {
            width: '500px',
            data: { apiculteurId: this.currentUser?.id || this.currentUser?.userId, produit }
        });
        ref.afterClosed().subscribe(result => {
            if (result) {
                this.snackBar.open('Produit modifié !', 'Fermer', { duration: 3000 });
                this.loadProduits();
            }
        });
    }

    supprimerProduit(produit: any): void {
        const ref = this.fuseConfirmation.open({
            title: 'Supprimer le produit',
            message: `Êtes-vous sûr de vouloir supprimer "${produit.nom}" ?`,
            actions: { confirm: { label: 'Supprimer', color: 'warn' } }
        });
        ref.afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this.produitService.delete(produit.id).subscribe({
                    next: () => {
                        this.snackBar.open('Produit supprimé', 'Fermer', { duration: 3000 });
                        this.loadProduits();
                    }
                });
            }
        });
    }

    getTypeLabel(type: string): string {
        const labels: any = {
            miel_fleurs: 'Miel de fleurs', miel_thym: 'Miel de thym',
            miel_lavande: 'Miel de lavande', miel_acacia: "Miel d'acacia",
            cire: 'Cire', propolis: 'Propolis', pollen: 'Pollen', autre: 'Autre'
        };
        return labels[type] || type;
    }
}
