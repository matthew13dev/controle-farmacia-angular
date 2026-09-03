import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL_AUTH, UsuarioCreateDTO, UsuarioLoginDTO, UsuarioViewDTO } from './api';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private usuarioLogado?:UsuarioViewDTO;


  login(dadosLogin:UsuarioLoginDTO){

    this.httpClient.post(`${API_URL_AUTH}/login`,dadosLogin,{withCredentials:true}).subscribe({
      next: (res) => {
       this.obterUsuarioLogado();
     },
      error: err => {
        console.log("credenciais invalidas: ",err);
        alert("Dados invalidos. Acesso negado.")
      }
    })

  }

  obterUsuarioLogado(){

    this.httpClient.get<UsuarioViewDTO>(`${API_URL_AUTH}/me`,{withCredentials:true}).subscribe({
      next: (res:UsuarioViewDTO) => {
        this.usuarioLogado = res;

          if(this.usuarioLogado?.role === 'ADMIN'){
            this.router.navigate(['/admin/usuarios']);
          }

          if(this.usuarioLogado?.role === 'USER'){
            this.router.navigate(['/validade']);
          }
        }
      })

    }

  obterUsuarios():Observable<UsuarioViewDTO[]>{

    return this.httpClient.get<UsuarioViewDTO[]>(`${API_URL_AUTH}/usuarios`,{
      withCredentials:true
    });
  }

  criarUsuario(novoUsuario:UsuarioCreateDTO):Observable<UsuarioViewDTO>{

    return this.httpClient.post<UsuarioViewDTO>(`${API_URL_AUTH}`, novoUsuario,{
      withCredentials: true,
    });
  }

  deletarUsuario(id:number){
    return this.httpClient.post<void>(`${API_URL_AUTH}/id`, {
      withCredentials: true,
    });
}
}
