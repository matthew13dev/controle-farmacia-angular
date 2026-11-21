import { ChangeDetectorRef, Component, inject, Input, signal, SimpleChanges } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);
  usuarioLogado = signal<string>('');

  ngOnInit(): void {
    this.serviceAuth.obterUsuarioLogado2().subscribe((logado: UsuarioViewDTO) => {
      if (logado) {
        this.usuarioLogado.set(logado.username);
        this.cdr.markForCheck(); // garante atualização mesmo com OnPush
      }
    });
  }
  }
}
