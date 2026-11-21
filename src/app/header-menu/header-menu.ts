import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../api/auth-service';
import { FormsModule } from '@angular/forms';
import { UsuarioViewDTO } from '../api/api';

@Component({
  imports: [RouterLink, RouterLinkActive, FormsModule],
  selector: 'app-header-menu',
  styleUrl: './header-menu.css',
  templateUrl: './header-menu.html',
})
export class HeaderMenu {
  @Input() esconderLink: boolean = false;

  private serviceAuth = inject(AuthService);
  usuarioLogado:string = "";

  ngOnInit() {
    const usuarioObj:UsuarioViewDTO = JSON.parse(<string>localStorage.getItem('usuarioLogado'));

    if(usuarioObj){
      this.usuarioLogado = usuarioObj.username;
      console.log("ativo: " + this.usuarioLogado);
    }
    else {
      console.log("nao logado");
    }

  }
}
