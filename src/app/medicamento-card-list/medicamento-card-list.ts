import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CLASSIFICAO_MEDICAMENTO,
  MedicamentoViewDTO,
  ValidadeMedicamentoCreateDTO,
} from '../api/api';
import { FormGroup, FormsModule } from '@angular/forms';
import { NovaValidadeComponent } from '../nova-validade-component/nova-validade-component';

@Component({
  imports: [FormsModule, NovaValidadeComponent],
  selector: 'app-medicamento-card-list',
  styleUrl: './medicamento-card-list.css',
  templateUrl: './medicamento-card-list.html',
})
export class MedicamentoCardList {
  @Input() medicamentoLista?: MedicamentoViewDTO[] | void;


  formatarTexto(texto: string|null|undefined): string {
    if (texto == null) {
      return '';
    }

    if(texto == undefined){
      return '';
    }


    return texto.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
  }



  idAtivo: number | null = null;

  protected toggleForm(id: number) {
    if (this.idAtivo == id) {
      this.idAtivo = null;
    } else {
      this.idAtivo = id;
    }
  }

  protected readonly CLASSIFICAO_MEDICAMENTO = CLASSIFICAO_MEDICAMENTO;
}
