import { Component } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-novo-medicamento-component',
  styleUrl: './novo-medicamento-component.css',
  templateUrl: './novo-medicamento-component.html',
  imports: [FormsModule],
})
export class NovoMedicamentoComponent {


  protected salvar() {
    alert("Medicamento registrado com sucesso!");
  }
}
