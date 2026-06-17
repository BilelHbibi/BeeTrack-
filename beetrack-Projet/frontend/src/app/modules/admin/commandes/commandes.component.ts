import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommandeService } from '../../services/commande.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-commandes',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        MatCardModule, MatButtonModule, MatIconModule,
        MatBadgeModule, MatSelectModule, MatFormFieldModule,
        MatChipsModule, MatSnackBarModule, MatTableModule
    ],
    templateUrl: './commandes.component.html',
})
export class CommandesComponent implements OnInit {
    commandes: any[] = [];
    nonLues = 0;
    loading = true;
    currentUser: any;
    displayedColumns = ['client', 'produit', 'quantite', 'montant', 'statut', 'date', 'actions'];

    statuts = ['EN_ATTENTE', 'CONFIRMEE', 'LIVREE', 'ANNULEE'];

    constructor(
        private commandeService: CommandeService,
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.currentUser = this.authService.getDecodedToken();
        this.loadCommandes();
    }

    loadCommandes(): void {
        const id = this.currentUser?.id || this.currentUser?.userId;
        this.loading = true;

        this.commandeService.getByApiculteur(id).subscribe({
            next: (data) => {
                this.commandes = data.sort((a, b) =>
                    new Date(b.dateCommande).getTime() - new Date(a.dateCommande).getTime()
                );
                this.nonLues = data.filter(c => !c.vue).length;
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    marquerLues(): void {
        const id = this.currentUser?.id || this.currentUser?.userId;
        this.commandeService.marquerLues(id).subscribe({
            next: () => {
                this.nonLues = 0;
                this.commandes.forEach(c => c.vue = true);
            }
        });
    }

    updateStatut(commande: any, statut: string): void {
        this.commandeService.updateStatut(commande.id, statut).subscribe({
            next: (updated) => {
                commande.statut = updated.statut;
                this.snackBar.open(`Statut mis à jour : ${statut}`, 'Fermer', { duration: 2000 });
            }
        });
    }

    getStatutColor(statut: string): string {
        const colors: any = {
            EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
            CONFIRMEE: 'bg-blue-100 text-blue-800',
            LIVREE: 'bg-green-100 text-green-800',
            ANNULEE: 'bg-red-100 text-red-800'
        };
        return colors[statut] || 'bg-gray-100 text-gray-800';
    }

    countByStatut(statut: string): number {
        return this.commandes.filter(c => c.statut === statut).length;
    }

    getStatutLabel(statut: string): string {
        const labels: any = {
            EN_ATTENTE: 'En attente', CONFIRMEE: 'Confirmée',
            LIVREE: 'Livrée', ANNULEE: 'Annulée'
        };
        return labels[statut] || statut;
    }
}
