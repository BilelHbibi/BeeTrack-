import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';

@Injectable({ providedIn: 'root' })
export class CommandeService {
    private api = `${environment.api}/commandes`;

    constructor(private http: HttpClient) {}

    passer(data: any): Observable<any> {
        return this.http.post<any>(this.api, data);
    }

    getByClient(clientId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.api}/client/${clientId}`);
    }

    getByApiculteur(apiculteurId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.api}/apiculteur/${apiculteurId}`);
    }

    getNonLues(apiculteurId: number): Observable<{ count: number }> {
        return this.http.get<{ count: number }>(`${this.api}/apiculteur/${apiculteurId}/non-lues`);
    }

    marquerLues(apiculteurId: number): Observable<any> {
        return this.http.patch<any>(`${this.api}/apiculteur/${apiculteurId}/marquer-lues`, {});
    }

    updateStatut(commandeId: number, statut: string): Observable<any> {
        return this.http.patch<any>(`${this.api}/${commandeId}/statut`, { statut });
    }
}
