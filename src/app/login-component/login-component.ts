import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer-component/footer-component';
import { UsuarioLoginDTO } from '../api/api';
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


    console.log("login:",dadosLogin)
    this._authService.login(dadosLogin);
  }
}
