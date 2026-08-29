import { ChangeDetectorRef, Component, inject, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderMenu } from '../header-menu/header-menu';
import { SeachBarComponent } from '../seach-bar-component/seach-bar-component';
import { MedicamentosService } from '../api/medicamentos-service';
import { MedicamentoCardList } from '../medicamento-card-list/medicamento-card-list';
import { MedicamentoViewDTO, ValidadeMedicamentoCreateDTO } from '../api/api';

@Component({
  imports: [FormsModule, MedicamentoCardList, HeaderMenu, SeachBarComponent, MedicamentoCardList],
  selector: 'app-api-component',
  styleUrl: './medicamentos-component.css',
  templateUrl: './medicamentos-component.html',
})
export class MedicamentosComponent {
  private _medicamentosService: MedicamentosService = inject(MedicamentosService);
  private cdr = inject(ChangeDetectorRef);

  medicamentosLista?: MedicamentoViewDTO[] = [];
  protected seachBar: string = '';

  ngOnInit(): void {
    this._medicamentosService.buscarTodos().subscribe({
      next: (data) => {
        this.medicamentosLista = data;
        this.cdr.detectChanges();
        console.log('medicamentos:', this.medicamentosLista);
      },
    });
  }
  ngOnChanges(changes: SimpleChanges<MedicamentosComponent>) {
    if (this.medicamentosLista) {
      this.cdr.detectChanges();
    }
  }
  buscarPorNome(nome: string) {
    this._medicamentosService.buscarPorNome(nome).subscribe({
      next: (result) => {
        this.medicamentosLista = result;
        this.cdr.detectChanges();
      },
    });
  }

  protected buscarPorRegistro(medicamentoRegistro: string) {
    this._medicamentosService.buscarPorRegistro(medicamentoRegistro).subscribe({
      next: (result) => {
        this.medicamentosLista = result;
        this.cdr.detectChanges();
      },
    });
  }

  protected buscarPorEAN(medicamentoEAN: string) {
    this._medicamentosService.buscarPorEan(medicamentoEAN).subscribe({
      next: (result) => {
        this.medicamentosLista = result;
        this.cdr.detectChanges();
      },
    });
  }

  protected listaFiltrada() {
    if (this.seachBar == '') {
      return this.medicamentosLista;
    }

    const termo: string = this.seachBar.toLocaleLowerCase();

    return this.medicamentosLista?.filter((item) => {
      return (
        item.descricao?.toLocaleLowerCase().includes(termo) ||
        item.fabricante?.toLocaleLowerCase().includes(termo) ||
        item.ean?.toLocaleLowerCase().includes(termo) ||
        item.registro_anvisa?.toLocaleLowerCase().includes(termo)
      );
    });
  }

  protected novaValidade($event: ValidadeMedicamentoCreateDTO) {

    this._medicamentosService.novaValidade($event);
  }
}
