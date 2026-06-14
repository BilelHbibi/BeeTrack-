import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// @ts-ignore
import { InterventionService } from '../../services/intervention.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import {
    AddInspectioneDialogComponent,
} from './add-inspectione-dialog/add-inspectione-dialog.component';
import {
    UpdateInspectioneDialogComponent,
} from './update-inspectione-dialog/update-inspectione-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-list-inspections',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatCheckboxModule
    ],
    templateUrl: './list-inspection.component.html',
    styleUrls: ['./list-inspection.component.scss']
})
export class ListInspectionsComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    isLoading = false;
    searchInputControl: FormControl = new FormControl();
    inspections$: any[] = []; // Liste des inspections
    flashMessage: 'success' | 'error' | null = null;

    constructor(
        private _interventionService: InterventionService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadInspections();

        // Filtrage côté client
        this.searchInputControl.valueChanges
            .pipe(takeUntil(this._unsubscribeAll), debounceTime(300))
            .subscribe(searchText => {
                console.log('Recherche:', searchText);
                // Filtrage si nécessaire
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // Charger toutes les inspections
    loadInspections(): void {
        this.isLoading = true;
        this._interventionService.getAllRecolte().subscribe((result: any[]) => {
            this.inspections$ = result;
            this.isLoading = false;
            console.log(result);
        });
    }

    // Ajouter une inspection
    openDialog(): void {
        const dialogRef = this.dialog.open(AddInspectioneDialogComponent, { width: '400px' });
        dialogRef.afterClosed().subscribe(result => {
            if (result) this.loadInspections();
        });
    }

    // Modifier une inspection
    openDialogUpdate(intervention: any): void {
        const dialogRef = this.dialog.open(UpdateInspectioneDialogComponent, {
            width: '400px',
            data: intervention
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) this.loadInspections();
        });
    }

    // Supprimer une inspection
    openDialogDelete(id: any): void {
        this._interventionService.deleteRecolte(id).subscribe(() => this.loadInspections());
    }

    // Fonctions utilitaires
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

}

