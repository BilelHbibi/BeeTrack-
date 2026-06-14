import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/Users.servive';

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html',
    imports: [
        ReactiveFormsModule
    ],
    standalone: true
})
export class UpdateProfileComponent implements OnInit {
    profileForm!: FormGroup;
    loading = false;
    user:any;
    decoded:any

    constructor(
        private fb: FormBuilder,
        private authService: UsersService,
    ) {}

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            email: [{ value: '', disabled: true }], // email non modifiable
            phone: [''],
            password: [''], // facultatif si user veut changer son mot de passe
        });
        this.getDecodedToken()
        this.loadUserData();
    }

    loadUserData(): void {
        this.authService.getMe().subscribe({
            next: (user) => {
                this.user=user;
                console.log(user)
                this.profileForm.patchValue({
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    phone: user.phone,
                });
            },
            error: () => {

            },
        });
    }
    getDecodedToken(): any {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            return null;
        }
        try {
            // Divise le token JWT en 3 parties et décode la payload (2ème partie)
            const payload = token.split('.')[1];
            this.decoded= atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(this.decoded);
        } catch (e) {
            console.error('Impossible de décoder le token', e);
            return null;
        }
    }

    onSubmit(): void {
        if (this.profileForm.invalid) return;
        console.log("cxcxc",this.decoded.role)
        this.loading = true;
const data={
    nom: this.profileForm.get('nom').value,
    prenom: this.profileForm.get('prenom').value,
    email: this.user.email,
    phone: this.user.phone,
    motDePasse: this.profileForm.get('password').value,
    role:this.user.role,
}
        this.authService.updateRecolte(this.user.id, data).subscribe(
    (res: Response) => {
        this.loading = false

    }
)
    }
}
