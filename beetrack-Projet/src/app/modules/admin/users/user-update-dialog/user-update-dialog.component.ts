import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { UsersService } from '../../../services/Users.servive';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: 'app-user-update-dialog',
    templateUrl: './user-update-dialog.component.html',
    imports: [
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
    standalone: true
})
export class UserUpdateDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UsersService,
        private dialogRef: MatDialogRef<UserUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.form = this.fb.group({
            nom: [data.nom, Validators.required],
            prenom: [data.prenom, Validators.required],
            motDePasse:['', Validators.required],
            email: [data.email, [Validators.required, Validators.email]],
            role: [data.role, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid && this.data.id) {
            this.userService.updateRecolte(this.data.id, this.form.value).subscribe({
                next: () => this.dialogRef.close(true),
                error: (err) => console.error('Erreur update utilisateur', err),
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
