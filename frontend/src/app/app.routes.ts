import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then((m) => m.HomeComponent)
        }
    },
    {
        path: 'actions',
        loadComponent: () => {
            return import('./actions/actions.component').then(
                m => m.ActionsComponent
            )
        }
    },
    {
        path: 'add-actions',
        loadComponent: () => {
            return import('./add-actions/add-actions.component').then(
                m => m.AddActionsComponent
            )
        }
    }
];
