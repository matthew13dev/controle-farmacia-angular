import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer-component/footer-component';

@Component({
  imports: [FormsModule, FooterComponent],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  private router = inject(Router);
  protected user: string = '';
  protected password: string = '';

  login() {
    if (this.user === 'user' && this.password === 'userpass') {
      this.router.navigate(['/validade']);
    } else if (this.user === 'admin' && this.password === 'adminpass') {
      this.router.navigate(['/admin']);
    } else {
      alert('credenciais invalidas');
    }
  }
}
