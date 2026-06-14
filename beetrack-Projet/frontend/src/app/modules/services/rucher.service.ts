// src/app/core/services/rucher.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rucher {
    id: number;
    nom: string;
    localisation: string;
    userId: number; // ID de l'utilisateur propriétaire
    // Les relations (ruches, recoltes) sont généralement chargées séparément pour des raisons de performance
}

@Injectable({
    providedIn: 'root'
})
export class RucherService {
    private apiUrl = 'http://localhost:8080/ruchers'; // Remplacez par l'URL de votre backend

    constructor(
        private http: HttpClient,
    ) { }

    getAllRuchers(): Observable<Rucher[]> {
        return this.http.get<Rucher[]>(this.apiUrl);
    }

    getRucherById(id: number): Observable<Rucher> {
        return this.http.get<Rucher>(`${this.apiUrl}/${id}`);
    }

    createRucher(rucher: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, rucher);
    }

    updateRucher(id: any, rucher: any): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/${id}`, rucher);
    }

    deleteRucher(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Méthode pour récupérer les ruches d'un rucher spécifique
    getRuchesByRucherId(rucherId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${rucherId}/ruches`);
    }
}
