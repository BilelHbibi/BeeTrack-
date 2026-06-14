import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/enviroment';
// On utilise 'any' pour l'utilisateur comme demandé
// Vous pouvez le remplacer par une interface User plus tard si besoin
@Injectable({
    providedIn: 'root',
})
export class UserService {
    private endpointAuth = `${environment.api}/users`;
    private keyAccessToken = 'access_token';

    // BehaviorSubject pour l'utilisateur (type any)
    private _user = new BehaviorSubject<any | null>(null);
    public user$ = this._user.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        // Charger l'utilisateur au démarrage si token existe
        this.loadUserFromToken();
    }

    // Getter pour l'utilisateur courant (synchrone)
    get currentUser(): any | null {
        return this._user.value;
    }

    // Décode le token et met à jour l'utilisateur
    private loadUserFromToken(): void {
        const token = this.getToken();
        if (token) {
            const decoded = this.decodeToken(token);
            if (decoded) {
                // On stocke l'utilisateur décodé (ou vous pouvez appeler /me pour plus de détails)
                this._user.next(decoded);
            }
        }
    }

    // ************************** TOKEN MANAGEMENT **************************

    decodeToken(token: string): any | null {
        try {
            return jwtDecode(token);
        } catch (e) {
            console.error('Token invalide ou expiré', e);
            this.doLogout();
            return null;
        }
    }

    getToken(): string | null {
        return localStorage.getItem(this.keyAccessToken);
    }

    setToken(token: string): void {
        localStorage.setItem(this.keyAccessToken, token);
        const decoded = this.decodeToken(token);
        if (decoded) {
            this._user.next(decoded);
        }
    }

    deleteToken(): void {
        localStorage.removeItem(this.keyAccessToken);
    }

    isTokenExpired(expiryTime: number): boolean {
        if (expiryTime) {
            return expiryTime - new Date().getTime() / 1000 <= 5;
        }
        return false;
    }

    doLogout(): void {
        this.deleteToken();
        this._user.next(null);
        this.router.navigate(['/login']);
    }

    // ************************** USER PROFILE **************************

    // Récupère le profil complet de l'utilisateur depuis l'API (optionnel)
    getUserProfile(): Observable<any> {
        return this.http.get<any>(`${this.endpointAuth}/me`).pipe(
            tap(user => {
                this._user.next(user); // Met à jour le BehaviorSubject
            })
        );
    }

    // Met à jour les infos personnelles
    updatePersonalInfo(userData: any): Observable<any> {
        return this.http.post<any>(`${this.endpointAuth}/personal-info`, userData).pipe(
            tap(updatedUser => {
                this._user.next(updatedUser); // Met à jour le BehaviorSubject avec les nouvelles données
            })
        );
    }

    // Met à jour l'avatar
    updateMyAvatar(formData: FormData): Observable<any> {
        return this.http.post<any>(`${this.endpointAuth}/my-avatar`, formData).pipe(
            tap(updatedUser => {
                this._user.next(updatedUser); // Met à jour l'avatar dans le BehaviorSubject
            })
        );
    }

    // ************************** PASSWORD **************************

    changePassword(password: string, newPassword: string, code: string, id: string): Observable<any> {
        return this.http.post<any>(`${this.endpointAuth}/${id}/change-password`, {
            password,
            newPassword,
            code,
        });
    }

    sendCode(id: string, password: string, newPassword: string): Observable<any> {
        return this.http.post<any>(`${this.endpointAuth}/${id}/send-code`, {
            password,
            newPassword,
        });
    }

    resendCode(id: string, params: any): Observable<any> {
        return this.http.patch<any>(`${this.endpointAuth}/${id}/resend-code`, params);
    }

    checkPassword(password: string): Observable<any> {
        return this.http.post<any>(`${this.endpointAuth}/check-password`, { password });
    }

    deleteAccount(id: string): Observable<any> {
        return this.http.post<any>(`${this.endpointAuth}/delete-account`, { id }).pipe(
            tap(() => {
                this.doLogout(); // Déconnexion après suppression
            })
        );
    }
}
