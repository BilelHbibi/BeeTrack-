import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProduitService } from '../services/produit.service';
import { CommandeDialogComponent } from './commande-dialog/commande-dialog.component';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-boutique',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatSnackBarModule],
    templateUrl: './boutique.component.html',
})
export class BoutiqueComponent implements OnInit {
    produits: any[] = [];
    loading = true;
    currentUser: any;

    constructor(
        private produitService: ProduitService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.currentUser = this.authService.getDecodedToken();
        this.loadProduits();
    }

    loadProduits(): void {
        this.loading = true;
        this.produitService.getAll().subscribe({
            next: (data) => { this.produits = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    commander(produit: any): void {
        const ref = this.dialog.open(CommandeDialogComponent, {
            width: '480px',
            data: { produit, currentUser: this.currentUser }
        });
        ref.afterClosed().subscribe(result => {
            if (result) {
                this.snackBar.open('Commande passée avec succès !', 'Fermer', { duration: 3000 });
                this.loadProduits();
            }
        });
    }

    getTypeLabel(type: string): string {
        const labels: Record<string, string> = {
            miel_fleurs: 'Miel de fleurs', miel_thym: 'Miel de thym',
            miel_lavande: 'Miel de lavande', miel_acacia: "Miel d'acacia",
            cire: 'Cire d\'abeille', propolis: 'Propolis', pollen: 'Pollen', autre: 'Autre'
        };
        return labels[type] || type;
    }

    getTypeEmoji(type: string): string {
        const emojis: Record<string, string> = {
            miel_fleurs: '🌸', miel_thym: '🌿', miel_lavande: '💜',
            miel_acacia: '🌳', cire: '🕯️', propolis: '🧪',
            pollen: '🌼', autre: '🍯'
        };
        return emojis[type] || '🍯';
    }

    getBgClass(type: string): string {
        const classes: Record<string, string> = {
            miel_fleurs: 'bg-pink-50',
            miel_thym:   'bg-green-50',
            miel_lavande:'bg-purple-50',
            miel_acacia: 'bg-lime-50',
            cire:        'bg-yellow-50',
            propolis:    'bg-orange-50',
            pollen:      'bg-amber-50',
        };
        return classes[type] || 'bg-amber-50';
    }
}
