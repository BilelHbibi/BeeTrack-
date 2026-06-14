
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ruche {
    id: number;
    nom: string;
    localisation: string;
    userId: number; // ID de l'utilisateur propriétaire
    // Les relations (ruches, recoltes) sont généralement chargées séparément pour des raisons de performance
}

@Injectable({
    providedIn: 'root'
})
export class rucheService {
    private apiUrl = 'http://localhost:8080/ruches'; // Remplacez par l'URL de votre backend

    constructor(
        private http: HttpClient,
    ) { }

    getAllruches(): Observable<ruche[]> {
        return this.http.get<ruche[]>(this.apiUrl);
    }

    getrucheById(id: number): Observable<ruche> {
        return this.http.get<ruche>(`${this.apiUrl}/${id}`);
    }

    createruche(ruche: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, ruche);
    }

    updateruche(id: any, ruche: any): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/${id}`, ruche);
    }

    deleteruche(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Méthode pour récupérer les ruches d'un ruche spécifique
    getRuchesByrucheId(rucheId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${rucheId}/ruches`);
    }
}
