import { ChangeDetectorRef, Component, inject, Input, SimpleChanges } from '@angular/core';
import { CLASSIFICAO_MEDICAMENTO, ValidadeMedicamentoViewDTO } from '../api/api';
import { validate } from '@angular/forms/signals';
import { ValidadeService } from '../api/validade-service';

@Component({
  selector: 'app-validade-card-list',
  styleUrl: './validade-card-list.css',
  templateUrl: './validade-card-list.html',
})
export class ValidadeCardList {
  @Input() listaValidade?: ValidadeMedicamentoViewDTO[] | void = [];
  protected readonly validate = validate;

  private _validadeService: ValidadeService = inject(ValidadeService);

  formatarTexto(texto: string|null|undefined): string {
    if (texto == null) {

      return '';
    }
    return texto.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
  }

  protected readonly CLASSIFICAO_MEDICAMENTO = CLASSIFICAO_MEDICAMENTO;


  private cdr = inject(ChangeDetectorRef);

  remover(id: number) {
    const isConfirm = confirm('Certeza que deseja deletar validade?');

    if (isConfirm) {
      try {
        this._validadeService.deletar(id).subscribe({
          next: () => {
            alert('Deletado com sucesso!');
            this.listaValidade = this.listaValidade?.filter((validade) => {
              return validade.id !== id;
            });
            this.cdr.detectChanges();
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
