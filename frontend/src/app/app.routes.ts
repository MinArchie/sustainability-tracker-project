import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        // homepage (home folder)
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then((m) => m.HomeComponent)
        }
    },
    {
        // view action history page (actions folder)
        path: 'actions',
        loadComponent: () => {
            return import('./actions/actions.component').then(
                m => m.ActionsComponent
            )
        }
    },
    {
        // post new action page (add-action folder)
        path: 'add-actions',
        loadComponent: () => {
            return import('./add-actions/add-actions.component').then(
                m => m.AddActionsComponent
            )
        }
    }
];
