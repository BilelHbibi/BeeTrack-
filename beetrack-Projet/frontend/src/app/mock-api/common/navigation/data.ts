/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

// ─── ADMIN ───────────────────────────────────────────────────────────────────
export const adminNavigation: FuseNavigationItem[] = [
    {
        id: 'accueil',
        title: 'Accueil',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboard'
    },
    { id: 'sep1', type: 'divider' },
    {
        id: 'ruchers',
        title: 'Gestion des ruchers',
        type: 'basic',
        icon: 'heroicons_outline:building-library',
        link: '/ruchers'
    },
    {
        id: 'ruches',
        title: 'Gestion des ruches',
        type: 'basic',
        icon: 'heroicons_outline:cube',
        link: '/ruches'
    },
    {
        id: 'inspection',
        title: 'Inspections',
        type: 'basic',
        icon: 'heroicons_outline:magnifying-glass',
        link: '/inspection'
    },
    {
        id: 'recolte',
        title: 'Récoltes',
        type: 'basic',
        icon: 'heroicons_outline:beaker',
        link: '/recoltte'
    },
    {
        id: 'taches',
        title: 'Tâches',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-list',
        link: '/taches'
    },
    {
        id: 'finance',
        title: 'Finance',
        type: 'basic',
        icon: 'heroicons_outline:banknotes',
        link: '/finance'
    },
    { id: 'sep2', type: 'divider' },
    {
        id: 'boutique',
        title: 'Boutique',
        type: 'basic',
        icon: 'heroicons_outline:shopping-bag',
        link: '/boutique'
    },
    {
        id: 'commandes-admin',
        title: 'Commandes',
        type: 'basic',
        icon: 'heroicons_outline:inbox-stack',
        link: '/commandes'
    },
    {
        id: 'users',
        title: 'Utilisateurs',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/users'
    },
    { id: 'sep3', type: 'divider' },
    {
        id: 'profile',
        title: 'Mon profil',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/profile'
    },
    {
        id: 'signout',
        title: 'Déconnexion',
        type: 'basic',
        icon: 'heroicons_outline:arrow-left-on-rectangle',
        link: '/sign-out'
    },
];

// ─── APICULTEUR ───────────────────────────────────────────────────────────────
export const apiculteurNavigation: FuseNavigationItem[] = [
    {
        id: 'accueil',
        title: 'Accueil',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/mes-produits'
    },
    { id: 'sep1', type: 'divider' },
    {
        id: 'mes-produits',
        title: 'Mes produits',
        type: 'basic',
        icon: 'heroicons_outline:shopping-bag',
        link: '/mes-produits'
    },
    {
        id: 'commandes',
        title: 'Commandes reçues',
        type: 'basic',
        icon: 'heroicons_outline:bell',
        link: '/commandes'
    },
    { id: 'sep2', type: 'divider' },
    {
        id: 'ruchers',
        title: 'Mes ruchers',
        type: 'basic',
        icon: 'heroicons_outline:building-library',
        link: '/ruchers'
    },
    {
        id: 'ruches',
        title: 'Mes ruches',
        type: 'basic',
        icon: 'heroicons_outline:cube',
        link: '/ruches'
    },
    {
        id: 'inspection',
        title: 'Inspections',
        type: 'basic',
        icon: 'heroicons_outline:magnifying-glass',
        link: '/inspection'
    },
    {
        id: 'recolte',
        title: 'Récoltes',
        type: 'basic',
        icon: 'heroicons_outline:beaker',
        link: '/recoltte'
    },
    {
        id: 'taches',
        title: 'Tâches',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-list',
        link: '/taches'
    },
    {
        id: 'finance',
        title: 'Finance',
        type: 'basic',
        icon: 'heroicons_outline:banknotes',
        link: '/finance'
    },
    { id: 'sep3', type: 'divider' },
    {
        id: 'profile',
        title: 'Mon profil',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/profile'
    },
    {
        id: 'signout',
        title: 'Déconnexion',
        type: 'basic',
        icon: 'heroicons_outline:arrow-left-on-rectangle',
        link: '/sign-out'
    },
];

// ─── CLIENT ───────────────────────────────────────────────────────────────────
export const clientNavigation: FuseNavigationItem[] = [
    {
        id: 'accueil',
        title: 'Accueil',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/boutique'
    },
    {
        id: 'boutique',
        title: 'Boutique',
        type: 'basic',
        icon: 'heroicons_outline:shopping-bag',
        link: '/boutique'
    },
    {
        id: 'mes-commandes',
        title: 'Mes commandes',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-list',
        link: '/mes-commandes'
    },
    { id: 'sep1', type: 'divider' },
    {
        id: 'profile',
        title: 'Mon profil',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/profile'
    },
    {
        id: 'signout',
        title: 'Déconnexion',
        type: 'basic',
        icon: 'heroicons_outline:arrow-left-on-rectangle',
        link: '/sign-out'
    },
];

// exports requis par le système Fuse (redirection vers rôle par défaut)
export const defaultNavigation: FuseNavigationItem[] = adminNavigation;
export const compactNavigation: FuseNavigationItem[] = adminNavigation;
export const futuristicNavigation: FuseNavigationItem[] = adminNavigation;
export const horizontalNavigation: FuseNavigationItem[] = adminNavigation;
