import { Routes } from '@angular/router';
import { ValidadeComponent } from './validade-component/validade-component';
import { MedicamentosComponent } from './medicamentos-component/medicamentos-component';
import { LoginComponent } from './login-component/login-component';
import { ValidadeDias10Component } from './validade-dias10-component/validade-dias10-component';
import { NovoMedicamentoComponent } from './novo-medicamento-component/novo-medicamento-component';
import { UsuariosComponent } from './usuarios-component/usuarios-component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'validade', component: ValidadeComponent },
  { path: 'medicamentos', component: MedicamentosComponent },

  { path: 'admin/novo-medicamento', component: NovoMedicamentoComponent },
  { path: 'admin/usuarios', component: UsuariosComponent },
];
