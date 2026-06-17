import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../../modules/services/user.service';
import { environment } from '../../../environments/enviroment';
import { AuthUtils } from './auth.utils';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    endpointAuth = `${environment.api}/auth`;
    endpointUsers = `${environment.api}/users`;
    private _authenticated = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post(`${this.endpointAuth}/forgot-password`, {
            email,
            projectCode: environment.code,
            resetUrl: `${environment.host}/confirmation-required?email=${encodeURIComponent(
                email.toLowerCase(),
            )}&type=forgot`,
        });
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post(`${this.endpointAuth}/reset-password`, password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password?: string; motDePasse?: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post(`${this.endpointAuth}/login`, { email: credentials.email, motDePasse: credentials.motDePasse ?? credentials.password })
            .pipe(
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    console.log("neeeexfr")
                    this.accessToken = response.token;
                    const connectedUser = this._userService.decodeToken(response.token);
                    // @ts-ignore
                    this._authenticated = true;
                    // Return a new observable with the response
                    return of(response);
                }),
            );
    }

    signUp(user: { nom: string; prenom: string; email: string; password: string; role?: string }): Observable<any> {
        return this._httpClient.post(`${environment.api}/auth/register`, user);
    }
    confirmationSignUp(code: string, email: string): Observable<any> {
        return this._httpClient.post(`${this.endpointUsers}/confirmation-sign-up`, {
            code,
            email,
        });
    }
    refreshToken(body: any): Observable<any> {
        body.projectCode = environment.code;
        return this._httpClient.post(`${this.endpointAuth}/refresh-token`, body).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response;
                return of(response);
            }),
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient
            .post(`${this.endpointAuth}/refresh-access-token`, {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false),
                ),
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.token;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service

                    // Return true
                    return of(true);
                }),
            );
    }
    getDecodedToken(): any {
        const token = this.accessToken;
        if (!token) {
            return null;
        }
        try {
            // Divise le token JWT en 3 parties et décode la payload (2ème partie)
            const payload = token.split('.')[1];
            const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decoded);
        } catch (e) {
            console.error('Impossible de décoder le token', e);
            return null;
        }
    }
    /**
     * Sign out
     */
    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('connectedSite');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        this._authenticated = false;
        return of(true);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken || this.accessToken === 'undefined') {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }
        return of(true);
    }

    resetPasswordByEmail(email: string, newPassword: string, code: string): Observable<null> {
        return this._httpClient
            .post<null>(`${this.endpointAuth}/change-password`, {
                email,
                newPassword,
                code,
                projectCode: environment.code,
            })
            .pipe(
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response;
                    // Set the authenticated flag to true
                    this._authenticated = true;
                    // Return a new observable with the response
                    return of(response);
                }),
            );
    }
    signInWithNewPass(email: string, password: string, code: string) {
        return this._httpClient
            .patch<null>(`${this.endpointAuth}/login-with-code`, {
                email,
                password,
                code,
                projectCode: environment.code,
            })
            .pipe(
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.token;
                    // Set the authenticated flag to true
                    this._authenticated = true;
                    // Return a new observable with the response
                    return of(response);
                }),
            );
    }
}
