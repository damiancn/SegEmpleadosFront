import { Route, Routes } from "@angular/router";
import { SideBarComponent } from "../layout/side-bar/side-bar.component";
import { authGuart } from "../core/guards/auth.guard";


export default [
    {
        path: '', component: SideBarComponent,
        children: [
            { path: 'empleado', canActivate: [authGuart], loadChildren: () => import('./proceso/empleado/routes').then(m => m.default) },
            { path: 'beneficiario', canActivate: [authGuart], loadChildren: () => import('./proceso/beneficiario/routes').then(m => m.default) },
        ]

    },
] as Route[];