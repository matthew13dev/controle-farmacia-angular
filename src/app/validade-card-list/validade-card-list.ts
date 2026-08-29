import { Component, Input} from '@angular/core';
import { CLASSIFICAO_MEDICAMENTO, ValidadeMedicamentoViewDTO } from '../api/api';
import { validate } from '@angular/forms/signals';

@Component({
  selector: 'app-validade-card-list',
  styleUrl: './validade-card-list.css',
  templateUrl: './validade-card-list.html',
})
export class ValidadeCardList {
  @Input() listaValidade?: ValidadeMedicamentoViewDTO[] | void = [];
  protected readonly validate = validate;

  formatarTexto(texto: string): string {
    if (!texto) return '';
    return texto.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
  }

  protected readonly CLASSIFICAO_MEDICAMENTO = CLASSIFICAO_MEDICAMENTO;

  remover(){

  }
}
