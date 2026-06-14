import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'example' },

    // Redirect signed-in user
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

    // Auth routes for guests (login, register, etc.)
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes') },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes') },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') }
        ]
    },

    // Auth routes for authenticated users (logout, unlock)
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes') }
        ]
    },

    // ✅ TOUTES LES ROUTES PROTÉGÉES (Admin, Ruchers, Automation, etc.) dans UN SEUL BLOC
    {
        path: '',
        canActivate: [AuthGuard], // <-- Une seule fois ici
        component: LayoutComponent,

        children: [
            { path: 'example', loadChildren: () => import('app/modules/admin/example/example.routes') },
            { path: 'ruchers', loadChildren: () => import('app/modules/admin/list-ruchers/rucher.routes') },
            { path: 'ruches', loadChildren: () => import('app/modules/admin/list-ruch/ruch.routes') },
            { path: 'automation', loadChildren: () => import('app/modules/admin/automation/automation.routes') },
            { path: 'recoltte', loadChildren: () => import('app/modules/admin/list-recolte/recolte.routes') },
            { path: 'inspection', loadChildren: () => import('app/modules/admin/list-inspection/inspection.routes') },
            { path: 'taches', loadChildren: () => import('app/modules/admin/list-tache/tache.routes') },
            { path: 'finance', loadChildren: () => import('app/modules/admin/dashboard-finance/finance.routes') },
            { path: 'users', loadChildren: () => import('app/modules/admin/users/users.routes') },
            { path: 'profile', loadChildren: () => import('app/modules/admin/update-profile/profile.routes') },
            { path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboard/dashboard.routes') },




        ]
    }
];
