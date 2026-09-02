import { Component, inject } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { FormGroup, FormsModule } from '@angular/forms';
import { CLASSIFICAO_MEDICAMENTO, MedicamentoCreateDTO, TIPO_MEDICAMENTO } from '../api/api';
import { FooterComponent } from '../footer-component/footer-component';
import { MedicamentosService } from '../api/medicamentos-service';

@Component({
  selector: 'app-novo-medicamento-component',
  styleUrl: './novo-medicamento-component.css',
  templateUrl: './novo-medicamento-component.html',
  imports: [FormsModule, HeaderMenu, FooterComponent],
})
export class NovoMedicamentoComponent {
  protected readonly TIPO_MEDICAMENTO = TIPO_MEDICAMENTO;
  protected readonly CLASSIFICAO_MEDICAMENTO = CLASSIFICAO_MEDICAMENTO;
  protected ean: string | null = null;
  protected descricao: string | null = null;
  protected fabricante: string | null = null;
  protected principio_ativo: string | null = null;
  protected registro_anvisa: string | null = null;

  protected tipo: TIPO_MEDICAMENTO | 'TIPO' = 'TIPO';
  protected classificacao: CLASSIFICAO_MEDICAMENTO | 'CLASSIFICACAO' = 'CLASSIFICACAO';

  private _medicamentoService = inject(MedicamentosService);

  limparFormulario() {
    this.ean = null;
    this.descricao = null;
    this.fabricante = null;
    this.principio_ativo = null;
    this.registro_anvisa = null;
    this.tipo = 'TIPO';
    this.classificacao = 'CLASSIFICACAO';
  }
  protected salvar() {
    if (this.descricao == null) {
      alert('descricao é obrigatoria');
      return;
    }

    if (this.ean == null) {
      alert('ean é obrigatoria');
      return;
    }

    if (this.fabricante == null) {
      alert('fabricante é obrigatoria');
      return;
    }

    if (this.tipo == 'TIPO') {
      alert('tipo é obrigatoria');
      return;
    }

    if (this.classificacao == 'CLASSIFICACAO') {
      alert('classificacao é obrigatoria');
      return;
    }

    const medicamento: MedicamentoCreateDTO = {
      ean: this.ean,
      descricao: this.descricao,
      fabricante: this.fabricante,
      principio_ativo: this.principio_ativo,
      registro_anvisa: this.registro_anvisa,
      tipo: this.tipo,
      classificacao: this.classificacao,
    };

    this._medicamentoService.novoMedicamento(medicamento).subscribe({
      next: (result) => {
        const medicametoCriado = result;
        alert('Criado com sucesso! ' + result.descricao);
        this.limparFormulario();
      },
    });
  }
}
