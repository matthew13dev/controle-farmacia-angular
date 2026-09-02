import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer-component/footer-component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API_URL_AUTHE, getAuthHeaders } from '../api/api';

@Component({
  imports: [FormsModule, FooterComponent],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  private router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  protected user: string = '';
  protected password: string = '';

  login(): void {
    if (!this.user || !this.password) {
      alert('Preencha o usuário e a senha!');
      return;
    }

    // 1. Salva temporariamente no localStorage para a função getAuthHeaders() ler
    localStorage.setItem('username', this.user);
    localStorage.setItem('password', this.password);

    // 2. Testa as credenciais batendo na rota de login protegida do Spring Boot
    this.http
      .get(`${API_URL_AUTHE}/login`, {
        headers: getAuthHeaders(),
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          console.log(response); // "Login bem-sucedido!"
          // Se deu certo, redireciona para a página principal ou de validade
          this.router.navigate(['/validade']);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          alert('Usuário ou senha inválidos!');
          // Limpa se falhar
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        },
      });
  }
}
