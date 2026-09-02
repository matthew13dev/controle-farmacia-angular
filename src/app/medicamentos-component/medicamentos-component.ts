import { ChangeDetectorRef, Component, inject, SimpleChanges } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { HeaderMenu } from '../header-menu/header-menu';
import { SeachBarComponent } from '../seach-bar-component/seach-bar-component';
import { MedicamentosService } from '../api/medicamentos-service';
import { MedicamentoCardList } from '../medicamento-card-list/medicamento-card-list';
import { MedicamentoViewDTO, ValidadeMedicamentoCreateDTO } from '../api/api';
import {FooterComponent} from "../footer-component/footer-component";

@Component({
  imports: [
    FormsModule,
    MedicamentoCardList,
    HeaderMenu,
    SeachBarComponent,
    MedicamentoCardList,
    FooterComponent,
  ],
  selector: 'app-api-component',
  styleUrl: './medicamentos-component.css',
  templateUrl: './medicamentos-component.html',
})
export class MedicamentosComponent {
  private _medicamentosService: MedicamentosService = inject(MedicamentosService);
  private cdr = inject(ChangeDetectorRef);

  medicamentosLista?: MedicamentoViewDTO[] = [];
  protected seachBar: string = '';

  ///paginacao

  protected paginaAtual = 0;
  protected itensPorPagina = 12;

  protected listaPaginada(): MedicamentoViewDTO[] {
    const filtrados: MedicamentoViewDTO[] = this.listaFiltrada() || [];
    const inicio = this.paginaAtual * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    return filtrados.slice(inicio, fim);
  }


  protected proximaPagina() {
    const totalItens = this.listaFiltrada()?.length || 0;
    // Compara se o índice do próximo bloco ainda está dentro do total de itens filtrados
    if ((this.paginaAtual + 1) * this.itensPorPagina < totalItens) {
      this.paginaAtual++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  protected paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  protected totalPaginas(): number {
    const totalItens = this.listaFiltrada()?.length || 0;
    return Math.ceil(totalItens / this.itensPorPagina) || 1;
  }

  ngOnInit(): void {
    this._medicamentosService.buscarTodos().subscribe({
      next: (data) => {
        this.medicamentosLista = data;
        this.cdr.detectChanges();
      },
    });
  }
  ngOnChanges(changes: SimpleChanges<MedicamentosComponent>) {
    if (this.medicamentosLista) {
      this.cdr.detectChanges();
    }
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
}
