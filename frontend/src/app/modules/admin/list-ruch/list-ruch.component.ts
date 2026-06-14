import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { rucheService } from '../../services/ruche.service';
import { AjoutRuchDialogComponent } from './ajout-ruch-dialog/ajout-ruch-dialog.component';
import {NgForOf, NgIf} from "@angular/common";
import {
    UpdateRucherDialogComponent
} from "../list-ruchers/update-rucher-dialog.component/update-rucher-dialog.component.component";
import {UpdateRucheDialogComponent} from "./update-ruche-dialog/update-ruche-dialog.component";

@Component({
    selector: 'app-list-ruches',
    templateUrl: './list-ruch.component.html',
    standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
    styleUrls: ['./list-ruch.component.html']
})
export class ListRuchComponent implements OnInit {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    ruches$: any;
    selectedRuche: any | null = null;

    constructor(
        private rucheService: rucheService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadRuches();
    }
    openUpdateDialog(ruche: any): void {
        const dialogRef = this.dialog.open(UpdateRucheDialogComponent, {
            width: '500px',
            data: ruche
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadRuches();
            }
        });
    }

    loadRuches(): void {
        this.rucheService.getAllruches().subscribe((res) => {
            this.ruches$ = res;
            console.log('Ruches:', res);
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AjoutRuchDialogComponent, { width: '400px' });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) this.loadRuches();
        });
    }



    openDialogDelete(id: number): void {
        if (confirm('Voulez-vous vraiment supprimer cette ruche ?')) {
            this.rucheService.deleteruche(id).subscribe(() => this.loadRuches());
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
