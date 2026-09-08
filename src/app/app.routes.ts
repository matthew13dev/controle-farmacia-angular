import { Routes } from '@angular/router';
import { ValidadeComponent } from './validade-component/validade-component';
import { MedicamentosComponent } from './medicamentos-component/medicamentos-component';
import { LoginComponent } from './login-component/login-component';
import { UsuariosComponent } from './usuarios-component/usuarios-component';
import { MedicamentosAdminComponent } from './medicamentos-admin-component/medicamentos-admin-component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'validade', component: ValidadeComponent },
  { path: 'medicamentos', component: MedicamentosComponent },

  { path: 'admin/medicamentos', component: MedicamentosAdminComponent },
  { path: 'admin/usuarios', component: UsuariosComponent },
];
