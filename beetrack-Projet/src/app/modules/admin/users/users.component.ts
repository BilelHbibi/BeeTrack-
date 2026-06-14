import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/Users.servive';
import { UserAddDialogComponent } from './user-add-dialog/user-add-dialog.component';
import { UserUpdateDialogComponent } from './user-update-dialog/user-update-dialog.component';
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    imports: [
        NgIf,
        NgClass,
        NgForOf
    ],
    standalone: true
})
export class UsersComponent implements OnInit {
    users$: any[] = [];

    constructor(
        private userService: UsersService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getAllRecolte().subscribe({
            next: (data) => (this.users$ = data),
            error: (err) => console.error('Erreur chargement utilisateurs', err),
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(UserAddDialogComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loadUsers();
            }
        });
    }

    openDialogUpdate(user: any): void {
        const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
            width: '500px',
            data: user,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loadUsers();
            }
        });
    }

    openDialogDelete(id: number): void {
        if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
            this.userService.deleteRecolte(id).subscribe({
                next: () => this.loadUsers(),
                error: (err) => console.error('Erreur suppression utilisateur', err),
            });
        }
    }
}
