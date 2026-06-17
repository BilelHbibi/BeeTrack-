import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { adminNavigation, apiculteurNavigation, clientNavigation } from 'app/mock-api/common/navigation/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class NavigationMockApi
{
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        this.registerHandlers();
    }

    registerHandlers(): void
    {
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() =>
            {
                const nav = this._getNavigationForRole();
                return [200, { compact: nav, default: nav, futuristic: nav, horizontal: nav }];
            });
    }

    private _getNavigationForRole(): FuseNavigationItem[]
    {
        // Décoder le JWT directement — source de vérité fiable
        const role = this._decodeRoleFromJwt();

        // Mettre à jour localStorage pour cohérence
        if (role) {
            localStorage.setItem('userRole', role);
        }

        console.log('[NavigationMockApi] Role détecté:', role);

        if (role === 'CLIENT')     return cloneDeep(clientNavigation);
        if (role === 'APICULTEUR') return cloneDeep(apiculteurNavigation);
        if (role === 'ADMIN')      return cloneDeep(adminNavigation);

        // Fallback localStorage si JWT absent
        const stored = localStorage.getItem('userRole') || '';
        if (stored === 'CLIENT')     return cloneDeep(clientNavigation);
        if (stored === 'APICULTEUR') return cloneDeep(apiculteurNavigation);

        return cloneDeep(adminNavigation);
    }

    private _decodeRoleFromJwt(): string
    {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return '';
            const parts = token.split('.');
            if (parts.length !== 3) return '';
            const payload = parts[1];
            const padded  = payload + '='.repeat((4 - payload.length % 4) % 4);
            const decoded = JSON.parse(atob(padded.replace(/-/g, '+').replace(/_/g, '/')));
            return (decoded?.role || '').toString().toUpperCase();
        } catch { return ''; }
    }
}
