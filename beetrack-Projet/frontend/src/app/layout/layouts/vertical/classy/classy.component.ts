import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';

// Navigation items par rôle — définis ici pour éviter tout problème de cache
const NAV_CLIENT: FuseNavigationItem[] = [
    { id: 'accueil',       title: 'Accueil',        type: 'basic', icon: 'heroicons_outline:home',                    link: '/boutique' },
    { id: 'boutique',      title: 'Boutique',        type: 'basic', icon: 'heroicons_outline:shopping-bag',            link: '/boutique' },
    { id: 'mes-commandes', title: 'Mes commandes',   type: 'basic', icon: 'heroicons_outline:clipboard-document-list', link: '/mes-commandes' },
    { id: 'sep1', type: 'divider' },
    { id: 'profile',  title: 'Mon profil',   type: 'basic', icon: 'heroicons_outline:user-circle',           link: '/profile' },
    { id: 'signout',  title: 'Déconnexion',  type: 'basic', icon: 'heroicons_outline:arrow-left-on-rectangle', link: '/sign-out' },
];

const NAV_APICULTEUR: FuseNavigationItem[] = [
    { id: 'accueil',   title: 'Accueil',          type: 'basic', icon: 'heroicons_outline:home',          link: '/mes-produits' },
    { id: 'sep1', type: 'divider' },
    { id: 'produits',  title: 'Mes produits',      type: 'basic', icon: 'heroicons_outline:shopping-bag',  link: '/mes-produits' },
    { id: 'commandes', title: 'Commandes reçues',  type: 'basic', icon: 'heroicons_outline:inbox-stack',   link: '/commandes' },
    { id: 'sep2', type: 'divider' },
    { id: 'ruchers',   title: 'Mes ruchers',       type: 'basic', icon: 'heroicons_outline:building-library', link: '/ruchers' },
    { id: 'ruches',    title: 'Mes ruches',        type: 'basic', icon: 'heroicons_outline:cube',          link: '/ruches' },
    { id: 'inspection',title: 'Inspections',       type: 'basic', icon: 'heroicons_outline:magnifying-glass', link: '/inspection' },
    { id: 'recolte',   title: 'Récoltes',          type: 'basic', icon: 'heroicons_outline:beaker',        link: '/recoltte' },
    { id: 'taches',    title: 'Tâches',            type: 'basic', icon: 'heroicons_outline:clipboard-document-list', link: '/taches' },
    { id: 'finance',   title: 'Finance',           type: 'basic', icon: 'heroicons_outline:banknotes',     link: '/finance' },
    { id: 'sep3', type: 'divider' },
    { id: 'profile',  title: 'Mon profil',   type: 'basic', icon: 'heroicons_outline:user-circle',           link: '/profile' },
    { id: 'signout',  title: 'Déconnexion',  type: 'basic', icon: 'heroicons_outline:arrow-left-on-rectangle', link: '/sign-out' },
];

const NAV_ADMIN: FuseNavigationItem[] = [
    { id: 'accueil',   title: 'Accueil',            type: 'basic', icon: 'heroicons_outline:home',          link: '/dashboard' },
    { id: 'sep1', type: 'divider' },
    { id: 'ruchers',   title: 'Gestion des ruchers', type: 'basic', icon: 'heroicons_outline:building-library', link: '/ruchers' },
    { id: 'ruches',    title: 'Gestion des ruches',  type: 'basic', icon: 'heroicons_outline:cube',          link: '/ruches' },
    { id: 'inspection',title: 'Inspections',         type: 'basic', icon: 'heroicons_outline:magnifying-glass', link: '/inspection' },
    { id: 'recolte',   title: 'Récoltes',            type: 'basic', icon: 'heroicons_outline:beaker',        link: '/recoltte' },
    { id: 'taches',    title: 'Tâches',              type: 'basic', icon: 'heroicons_outline:clipboard-document-list', link: '/taches' },
    { id: 'finance',   title: 'Finance',             type: 'basic', icon: 'heroicons_outline:banknotes',     link: '/finance' },
    { id: 'sep2', type: 'divider' },
    { id: 'boutique',  title: 'Boutique',            type: 'basic', icon: 'heroicons_outline:shopping-bag',  link: '/boutique' },
    { id: 'commandes', title: 'Commandes',           type: 'basic', icon: 'heroicons_outline:inbox-stack',   link: '/commandes' },
    { id: 'users',     title: 'Utilisateurs',        type: 'basic', icon: 'heroicons_outline:users',         link: '/users' },
    { id: 'sep3', type: 'divider' },
    { id: 'profile',  title: 'Mon profil',   type: 'basic', icon: 'heroicons_outline:user-circle',           link: '/profile' },
    { id: 'signout',  title: 'Déconnexion',  type: 'basic', icon: 'heroicons_outline:arrow-left-on-rectangle', link: '/sign-out' },
];

@Component({
    selector     : 'classy-layout',
    templateUrl  : './classy.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [
        FuseLoadingBarComponent,
        FuseVerticalNavigationComponent,
        NotificationsComponent,
        UserComponent,
        NgIf,
        MatIconModule,
        MatButtonModule,
        RouterOutlet,
    ],
})
export class ClassyLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    user: User;
    navItems: FuseNavigationItem[] = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
    ) {}

    get currentYear(): number { return new Date().getFullYear(); }

    ngOnInit(): void
    {
        // Calcul immédiat des items de navigation selon le rôle JWT
        this.navItems = this._getNavForRole();

        // Réabonnement utilisateur
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => { this.user = user; });

        // Réabonnement écran
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleNavigation(name: string): void
    {
        const nav = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);
        if (nav) { nav.toggle(); }
    }

    private _getNavForRole(): FuseNavigationItem[]
    {
        const role = this._readRoleFromToken();
        if (role === 'CLIENT')     return NAV_CLIENT;
        if (role === 'APICULTEUR') return NAV_APICULTEUR;
        if (role === 'ADMIN')      return NAV_ADMIN;
        return NAV_ADMIN;
    }

    private _readRoleFromToken(): string
    {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return '';
            const payload = token.split('.')[1];
            const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
            return (json?.role || '').toUpperCase();
        } catch { return ''; }
    }
}
