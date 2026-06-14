import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { UsersService } from '../../..//services/Users.servive';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-user-add-dialog',
    templateUrl: './user-add-dialog.component.html',
    imports: [
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule
    ],
    standalone: true
})
export class UserAddDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UsersService,
        private dialogRef: MatDialogRef<UserAddDialogComponent>
    ) {
        this.form = this.fb.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            motDePasse: ['', Validators.required],
            role: ['', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.userService.createRecolte(this.form.value).subscribe({
                next: () => this.dialogRef.close(true),
                error: (err) => console.error('Erreur ajout utilisateur', err),
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
