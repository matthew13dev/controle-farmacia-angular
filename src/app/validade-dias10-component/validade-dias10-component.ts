import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { ValidadeService } from '../api/validade-service';
import { ValidadeCardList } from '../validade-card-list/validade-card-list';
import { ValidadeMedicamentoViewDTO } from '../api/api';
import {SeachBarComponent} from '../seach-bar-component/seach-bar-component';
import { FooterComponent } from '../footer-component/footer-component';

@Component({
  imports: [HeaderMenu, ValidadeCardList, SeachBarComponent, FooterComponent],
  selector: 'app-validade-dias10-component',
  styleUrl: './validade-dias10-component.css',
  templateUrl: './validade-dias10-component.html',
})
export class ValidadeDias10Component {
  private _validadeService: ValidadeService = inject(ValidadeService);
  private cdr = inject(ChangeDetectorRef);

  listaValidade10dias: ValidadeMedicamentoViewDTO[] = [];
  protected seachBar: string = '';

  ngOnInit() {
    this._validadeService.carregar10dias().subscribe({
      next: (validade) => {
        this.listaValidade10dias = validade;
        this.cdr.detectChanges();
      },
    });
  }
}
