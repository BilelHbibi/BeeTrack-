import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjoutDipenseDialogComponent } from './ajout-dipense-dialog/ajout-dipense-dialog.component';
import { AjoutRevenuDialogComponent } from './ajout-revenu-dialog/ajout-revenu-dialog.component';
import { FinanceService } from '../../services/Finance.service';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard-finance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-finance.component.html',
  styleUrls: ['./dashboard-finance.component.scss']
})
export class DashboardFinanceComponent {

    depenses: any[] = [];
    revenus: any[] = [];
    isLoading = false;

    constructor(
        private dialog: MatDialog,
        private financeService: FinanceService,

    ) {}

    ngOnInit(): void {
        this.loadData();

    }

    loadData(): void {
        this.isLoading = true;
        this.financeService.getDepenses().subscribe(dep => {
            this.depenses = dep;
            this.financeService.getRevenus().subscribe(rev => {
                this.revenus = rev;
                this.isLoading = false;
            });
        });
    }

    get totalDepenses(): number {
        return this.depenses.reduce((sum, d) => sum + d.montant, 0);
    }

    get totalRevenus(): number {
        return this.revenus.reduce((sum, r) => sum + r.montant, 0);
    }

    get solde(): number {
        return this.totalRevenus - this.totalDepenses;
    }

    openAjoutDepense(): void {
        const dialogRef = this.dialog.open(AjoutDipenseDialogComponent, { width: '400px' });
        dialogRef.afterClosed().subscribe(result => {
            if (result) this.loadData();
        });
    }

    openAjoutRevenu(): void {
        const dialogRef = this.dialog.open(AjoutRevenuDialogComponent, { width: '400px' });
        dialogRef.afterClosed().subscribe(result => {
            if (result) this.loadData();
        });
    }
}
