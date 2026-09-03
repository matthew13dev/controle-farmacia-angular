import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer-component/footer-component';
import { HttpClient} from '@angular/common/http';
import { API_URL_AUTH, API_URL_MEDICAMENTOS, UsuarioLoginDTO } from '../api/api';
import { AuthService } from '../api/auth-service';

@Component({
  imports: [FormsModule, FooterComponent],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  private _authService = inject(AuthService);

  protected user: string = '';
  protected password: string = '';

  login() {
    const dadosLogin: UsuarioLoginDTO = {
      username: this.user,
      password: this.password,
    };

    this._authService.login(dadosLogin);
  }
}
