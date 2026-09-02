import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { SeachBarComponent } from '../seach-bar-component/seach-bar-component';
import { ValidadeService } from '../api/validade-service';
import { ValidadeCardList } from '../validade-card-list/validade-card-list';
import { ValidadeMedicamentoViewDTO } from '../api/api';
import { FooterComponent } from '../footer-component/footer-component';
import { filter } from 'rxjs';

@Component({
  imports: [HeaderMenu, SeachBarComponent, ValidadeCardList, FooterComponent],
  selector: 'app-validade-component',
  styleUrl: './validade-component.css',
  templateUrl: './validade-component.html',
})
export class ValidadeComponent {
  private _validadeService: ValidadeService = inject(ValidadeService);
  private crf = inject(ChangeDetectorRef);
  protected seachBar: string = '';

  validadeLista: ValidadeMedicamentoViewDTO[] = [];

  ngOnInit() {
    this._validadeService.carregar().subscribe({
      next: (data: any) => {
        this.validadeLista = data;
        this.crf.detectChanges();
      },
    });
  }


  listaFiltrada(): ValidadeMedicamentoViewDTO[] {
    const listaFiltrada = this.validadeLista;
    const termo = this.seachBar.toLowerCase();

    if (this.seachBar === '') {
      return listaFiltrada;
    }

    return listaFiltrada.filter(validade=>{
      return validade.medicamento.descricao?.toLocaleLowerCase().includes(termo)
      || validade.medicamento.ean?.toLocaleLowerCase().includes(termo)
      })
  }
}
