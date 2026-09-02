import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  CLASSIFICAO_MEDICAMENTO,
  MedicamentoViewDTO,
  ValidadeMedicamentoCreateDTO,
} from '../api/api';
import { FormsModule } from '@angular/forms';
import { ValidadeService } from '../api/validade-service';

@Component({
  selector: 'app-nova-validade-component',
  styleUrl: './nova-validade-component.css',
  templateUrl: './nova-validade-component.html',
  imports: [FormsModule],
})
export class NovaValidadeComponent {

  private _validadeService: ValidadeService = inject(ValidadeService);

  protected loteValidade: string | null = null;
  protected dataValidade: string | null = null;

  @Input() medicamento?: MedicamentoViewDTO;
  @Output() validadeAdicionadaEvent = new EventEmitter();

  protected criarValidade() {
    const classificacao = this.medicamento?.classificacao;

// Verifica se é tarja vermelha ou preta (ou qualquer uma que não seja MIP, se preferir)
    const exigeLote = classificacao === CLASSIFICAO_MEDICAMENTO.TARJA_PRETA || classificacao === CLASSIFICAO_MEDICAMENTO.TARJA_VERMELHA; // ou use .toLowerCase() se variar

    if (exigeLote && this.loteValidade == null) {
      alert('Lote é obrigatório para medicamentos de Tarja Vermelha ou Preta!');
      return;
    }

    if (this.dataValidade == null) {
      alert('Data de validade deve ser preenchida');
      return;
    }

    if(this.medicamento){
    }

    const novaValidade: ValidadeMedicamentoCreateDTO = {
      lote: this.loteValidade,
      data_vencimento: this.dataValidade,
      medicamentoId: this.medicamento?.id,
    };

    this._validadeService.criarValidade(novaValidade).subscribe({
      next: (result) => {
        alert('Criado com sucesso!' + result.medicamento.descricao);
        this.limparForm();
        this.validadeAdicionadaEvent.emit(true);
      },
    });
  }

  limparForm() {
    this.loteValidade = null;
    this.dataValidade = null;
  }

  protected readonly CLASSIFICAO_MEDICAMENTO = CLASSIFICAO_MEDICAMENTO;
}

