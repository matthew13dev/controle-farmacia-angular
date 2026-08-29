import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header-menu',
  styleUrl: './header-menu.css',
  templateUrl: './header-menu.html',
})
export class HeaderMenu {
  @Input() esconderLink: boolean = false;
}
