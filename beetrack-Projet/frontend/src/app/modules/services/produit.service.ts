import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';

@Injectable({ providedIn: 'root' })
export class ProduitService {
    private api = `${environment.api}/produits`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.api);
    }

    getByApiculteur(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.api}/apiculteur/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post<any>(this.api, data);
    }

    update(id: number, data: any): Observable<any> {
        return this.http.put<any>(`${this.api}/${id}`, data);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.api}/${id}`);
    }
}
