import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {UpdateRecolteDialogComponent} from "./update-recolte-dialog/update-recolte-dialog.component";
import {AjoutRuchDialogComponent} from "../list-ruch/ajout-ruch-dialog/ajout-ruch-dialog.component";
import { RecolteService } from "../../services/Recolte.service";
import {MatDialog} from "@angular/material/dialog";
import {AddRecolteDialogComponent} from "./add-recolte-dialog/add-recolte-dialog.component";

@Component({
  selector: 'app-list-recolte',
  standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './list-recolte.component.html',
  styleUrls: ['./list-recolte.component.scss']
})
export class ListRecolteComponent {
    recoltes: any[] = [];

    constructor(private recolteService: RecolteService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.loadRecoltes();
    }

    loadRecoltes() {
        this.recolteService.getAllRecolte().subscribe(data => this.recoltes = data);
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(AddRecolteDialogComponent, { width: '500px' });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.loadRecoltes();
        });
    }

    openUpdateDialog(recolte: any) {
        const dialogRef = this.dialog.open(UpdateRecolteDialogComponent, { width: '500px', data: recolte });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.loadRecoltes();
        });
    }

    deleteRecolte(id: number) {
        if (confirm('Voulez-vous vraiment supprimer cette récolte ?')) {
            this.recolteService.deleteRecolte(id).subscribe(() => this.loadRecoltes());
        }
    }

}
