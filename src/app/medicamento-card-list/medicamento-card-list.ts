import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CLASSIFICAO_MEDICAMENTO,
  MedicamentoViewDTO,
  ValidadeMedicamentoCreateDTO,
} from '../api/api';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-medicamento-card-list',
  styleUrl: './medicamento-card-list.css',
  templateUrl: './medicamento-card-list.html',
})
export class MedicamentoCardList {
  @Input() medicamentoLista?: MedicamentoViewDTO[] | void;
  @Output() adicionarValidade = new EventEmitter<ValidadeMedicamentoCreateDTO>();

  formatarTexto(texto: string): string {
    if (!texto) return '';
    return texto.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
  }

  protected readonly CLASSIFICAO_MEDICAMENTO = CLASSIFICAO_MEDICAMENTO;

  protected loteValidade: string = '';
  protected dataValidade:string = '';

  protected criarValidade(medicamento: MedicamentoViewDTO) {

    if(this.loteValidade == '' || this.dataValidade == ''){
      alert("dados incompletos");
    }
    const novaValidade: ValidadeMedicamentoCreateDTO = {
      lote: this.loteValidade,
      data_vencimento: this.dataValidade,
      medicamento: medicamento,
    };

        this.adicionarValidade.emit(novaValidade);
        this.idAtivo = null;
        this.loteValidade = '';
        this.dataValidade = '';

  }


  idAtivo:number|null = null;

  protected toggleForm(id: number) {

    if(this.idAtivo == id){
      this.idAtivo = null;
    }
    else {
      this.idAtivo = id;
    }


  }
}
