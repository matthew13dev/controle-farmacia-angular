import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { SeachBarComponent } from '../seach-bar-component/seach-bar-component';
import { ValidadeService } from '../api/validade-service';
import { ValidadeCardList } from '../validade-card-list/validade-card-list';
import { ValidadeMedicamentoViewDTO } from '../api/api';

@Component({
  imports: [HeaderMenu, SeachBarComponent, ValidadeCardList],
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
        console.log('validade', this.validadeLista);
      },
    });
  }
}
