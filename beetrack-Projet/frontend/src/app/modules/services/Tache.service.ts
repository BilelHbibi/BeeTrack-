
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recolte {
    id: number;
    nom: string;
    localisation: string;
    userId: number; // ID de l'utilisateur propriétaire
    // Les relations (ruches, recoltes) sont généralement chargées séparément pour des raisons de performance
}

@Injectable({
    providedIn: 'root'
})
export class TacheService {
    private apiUrl = 'http://localhost:8080/taches'; // Remplacez par l'URL de votre backend

    constructor(
        private http: HttpClient,
    ) { }

    getAllRecolte(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getRecolteeById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    createRecolte(ruche: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, ruche);
    }

    updateRecolte(id: any, ruche: any): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/${id}`, ruche);
    }

    deleteRecolte(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Méthode pour récupérer les ruches d'un ruche spécifique
    getRuchesByrucheId(rucheId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${rucheId}/ruches`);
    }
}
