import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TacheService} from "../../services/Tache.service";
import {UpdateTacheDialogComponent} from "./update-tache-dialog/update-tache-dialog.component";
import {AddTacheDialogComponent} from "./add-tache-dialog/add-tache-dialog.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list-tache',
  standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.scss']
})
export class ListTacheComponent {
    taches: any[] = [];

    constructor(private tacheService: TacheService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.loadTaches();
    }

    loadTaches() {
        this.tacheService.getAllRecolte().subscribe((data) => {
            this.taches = data;
        });
    }

    addTache() {
        const dialogRef = this.dialog.open(AddTacheDialogComponent, {
            width: '500px',
            data: null,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) this.loadTaches();
        });
    }

    editTache(tache: any) {
        const dialogRef = this.dialog.open(UpdateTacheDialogComponent, {
            width: '500px',
            data: tache,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) this.loadTaches();
        });
    }

    deleteTache(id: number) {
        this.tacheService.deleteRecolte(id).subscribe(() => {
            this.loadTaches();
        });
    }
}
