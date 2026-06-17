import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommandeService } from '../../services/commande.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-mes-commandes',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule, MatButtonModule, MatIconModule,
        MatChipsModule, MatSnackBarModule, MatTableModule,
        MatProgressSpinnerModule
    ],
    template: `
    <div class="flex flex-col flex-auto p-6 sm:p-10">
      <!-- En-tête -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Mes commandes</h1>
          <p class="text-secondary mt-1">Suivez l'état de vos commandes de produits apicoles</p>
        </div>
        <mat-icon class="text-amber-500 icon-size-12">local_shipping</mat-icon>
      </div>

      <!-- Statistiques rapides -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <mat-card class="text-center py-4">
          <div class="text-3xl font-bold text-yellow-600">{{ countByStatut('EN_ATTENTE') }}</div>
          <div class="text-sm text-secondary mt-1">En attente</div>
        </mat-card>
        <mat-card class="text-center py-4">
          <div class="text-3xl font-bold text-blue-600">{{ countByStatut('CONFIRMEE') }}</div>
          <div class="text-sm text-secondary mt-1">Confirmées</div>
        </mat-card>
        <mat-card class="text-center py-4">
          <div class="text-3xl font-bold text-green-600">{{ countByStatut('LIVREE') }}</div>
          <div class="text-sm text-secondary mt-1">Livrées</div>
        </mat-card>
        <mat-card class="text-center py-4">
          <div class="text-3xl font-bold text-gray-600">{{ commandes.length }}</div>
          <div class="text-sm text-secondary mt-1">Total</div>
        </mat-card>
      </div>

      <!-- Chargement -->
      <div *ngIf="loading" class="flex justify-center py-16">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <!-- Aucune commande -->
      <div *ngIf="!loading && commandes.length === 0" class="flex flex-col items-center py-16 text-secondary">
        <mat-icon class="icon-size-16 mb-4">shopping_bag</mat-icon>
        <p class="text-xl font-medium">Aucune commande pour le moment</p>
        <p class="mt-2">Rendez-vous à la boutique pour découvrir nos produits.</p>
        <a href="/boutique" mat-flat-button color="primary" class="mt-6">Aller à la boutique</a>
      </div>

      <!-- Liste des commandes -->
      <div *ngIf="!loading && commandes.length > 0" class="flex flex-col gap-4">
        <mat-card *ngFor="let cmd of commandes" class="p-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <!-- Infos produit -->
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-lg overflow-hidden bg-amber-50 flex-shrink-0">
                <img *ngIf="cmd.produit?.imageUrl" [src]="cmd.produit.imageUrl"
                     class="w-full h-full object-cover" [alt]="cmd.produit.nom" />
                <div *ngIf="!cmd.produit?.imageUrl" class="w-full h-full flex items-center justify-center">
                  <mat-icon class="text-amber-400">local_florist</mat-icon>
                </div>
              </div>
              <div>
                <div class="font-semibold text-lg">{{ cmd.produit?.nom }}</div>
                <div class="text-secondary text-sm">Quantité : {{ cmd.quantite }} kg</div>
                <div class="text-secondary text-sm">Livraison : {{ cmd.adresseLivraison }}</div>
                <div class="text-secondary text-sm">Tél : {{ cmd.telephone }}</div>
              </div>
            </div>

            <!-- Statut et montant -->
            <div class="flex flex-col items-end gap-2">
              <span class="px-3 py-1 rounded-full text-sm font-medium" [ngClass]="getStatutClass(cmd.statut)">
                {{ getStatutLabel(cmd.statut) }}
              </span>
              <div class="text-xl font-bold text-amber-600">{{ cmd.montantTotal | number:'1.2-2' }} DT</div>
              <div class="text-xs text-secondary">{{ cmd.dateCommande | date:'dd/MM/yyyy HH:mm' }}</div>
            </div>
          </div>
        </mat-card>
      </div>
    </div>
    `,
})
export class MesCommandesComponent implements OnInit {
    commandes: any[] = [];
    loading = true;
    currentUser: any;

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
        this.commandeService.getByClient(id).subscribe({
            next: (data) => {
                this.commandes = data.sort((a: any, b: any) =>
                    new Date(b.dateCommande).getTime() - new Date(a.dateCommande).getTime()
                );
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    countByStatut(statut: string): number {
        return this.commandes.filter(c => c.statut === statut).length;
    }

    getStatutLabel(statut: string): string {
        const labels: any = {
            EN_ATTENTE: 'En attente',
            CONFIRMEE: 'Confirmée',
            LIVREE: 'Livrée',
            ANNULEE: 'Annulée'
        };
        return labels[statut] || statut;
    }

    getStatutClass(statut: string): string {
        const classes: any = {
            EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
            CONFIRMEE: 'bg-blue-100 text-blue-800',
            LIVREE: 'bg-green-100 text-green-800',
            ANNULEE: 'bg-red-100 text-red-800'
        };
        return classes[statut] || 'bg-gray-100 text-gray-800';
    }
}
