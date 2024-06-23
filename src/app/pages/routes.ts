import { Route, Routes } from "@angular/router";
import { SideBarComponent } from "../layout/side-bar/side-bar.component";
import { DashboardComponent } from "../layout/dashboard/dashboard.component";
import { RolComponent } from "./configuracion/rol/rol.component";


export default [
    {
        path: '', component: SideBarComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'rol', loadChildren: () => import('./configuracion/rol/routes').then(m => m.default) },
            { path: 'usuario', loadChildren: () => import('./configuracion/usuario/routes').then(m => m.default) },
            { path: 'empleado', loadChildren: () => import('./proceso/empleado/routes').then(m => m.default) },
            { path: 'beneficiario', loadChildren: () => import('./proceso/beneficiario/routes').then(m => m.default) },
        ]
        // canActivate: [authGuart],
    },
] as Route[];