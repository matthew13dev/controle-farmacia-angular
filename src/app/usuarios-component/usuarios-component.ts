import { ChangeDetectorRef, Component, inject, SimpleChanges } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { FooterComponent } from '../footer-component/footer-component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_URL_AUTH, UsuarioCreateDTO, UsuarioViewDTO } from '../api/api';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../api/auth-service';

@Component({
  imports: [HeaderMenu, FooterComponent, FormsModule],
  selector: 'app-usuarios-component',
  styleUrl: './usuarios-component.css',
  templateUrl: './usuarios-component.html',
})
export class UsuariosComponent {
  private http: HttpClient = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  private _authService: AuthService = inject(AuthService);

  listaUsuarios?: UsuarioViewDTO[] = [];

  protected adicionarToggle: boolean = false;
  protected role: string = 'USER';
  protected username: string = '';
  protected password: string = '';

  ngOnInit() {
    this._authService.obterUsuarios().subscribe({
        next: (data) => {
          this.listaUsuarios = data;
          this.cdr.detectChanges();
        },
      });
  }

  ngOnChanges(changes: SimpleChanges<UsuariosComponent>) {
    if (changes.listaUsuarios) {
      this.cdr.detectChanges();
    }
  }

  protected deletar(id: number|null) {

    if(id){
      this._authService.deletarUsuario(id);
    }



    this.listaUsuarios?.filter((item)=>item.id !== id);
    this.cdr.detectChanges();
  }

  protected adicionarUsuario() {

    if(this.username === '' || this.password === '') {
      alert("dados incompletos");
      return;
    }

    const novoUsuario:UsuarioCreateDTO = {
      username: this.username,
      password: this.password,
      role: this.role
    }

    this._authService.criarUsuario(novoUsuario)

    this.listaUsuarios?.push({
      id:null,
      username:novoUsuario.username,
      role:novoUsuario.role
    })

    this.cdr.detectChanges();
  }
}
