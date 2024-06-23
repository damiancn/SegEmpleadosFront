import { Route } from "@angular/router";
import { EmpleadoComponent } from "./empleado/empleado.component";
import { BeneficiarioComponent } from "./beneficiario/beneficiario.component";
export default [
    { path: 'empleado', component: EmpleadoComponent },
    { path: 'beneficiario', component: BeneficiarioComponent },
] as Route[];