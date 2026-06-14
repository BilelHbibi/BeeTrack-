
import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class FinanceService {
    private apiUrl ='http://localhost:8080';

    constructor(private http: HttpClient) {}

    // --- Dépenses ---
    getDepenses(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/depenses`);
    }
    getDashboard(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/api/dashboard`);
    }

    getDepenseById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/depenses/${id}`);
    }

    addDepense(depense: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/depenses`, depense);
    }

    updateDepense(id: number, depense: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/depenses/${id}`, depense);
    }

    deleteDepense(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/depenses/${id}`);
    }

    // --- Revenus ---
    getRevenus(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/revenus`);
    }

    getRevenuById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/revenus/${id}`);
    }

    addRevenu(revenu: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/revenus`, revenu);
    }

    updateRevenu(id: number, revenu: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/revenus/${id}`, revenu);
    }

    deleteRevenu(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/revenus/${id}`);
    }
}
