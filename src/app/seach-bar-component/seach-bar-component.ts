import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-seach-bar-component',
  styleUrl: './seach-bar-component.css',
  templateUrl: './seach-bar-component.html',
})
export class SeachBarComponent {
  @Input() seachBar = '';
  @Output() seachBarChange = new EventEmitter<string>();

  enviarSeachBar(valor:string) {
    this.seachBar = valor;
    this.seachBarChange.emit(this.seachBar);
  }

  limparSeachBar() {
    this.seachBar = '';
    this.seachBarChange.emit(this.seachBar);
  }
}
