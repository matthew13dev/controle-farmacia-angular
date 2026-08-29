import { Component } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { NovoMedicamentoComponent } from '../novo-medicamento-component/novo-medicamento-component';

@Component({
  imports: [HeaderMenu, NovoMedicamentoComponent],
  selector: 'app-novo-registro-component',
  styleUrl: './novo-registro-component.css',
  templateUrl: './novo-registro-component.html',
})
export class NovoRegistroComponent {
}
