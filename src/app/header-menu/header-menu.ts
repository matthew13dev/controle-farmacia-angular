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
    this.serviceAuth.obterUsuarioLogado2().subscribe((logado) => {
      if (logado) {
        this.usuarioLogado = logado.username;
        console.log("ativo: " + this.usuarioLogado);
      }
    });
  }
}
