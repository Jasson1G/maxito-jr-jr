import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public plugins = [
    {
      name: 'Barcode Scanning',
      url: '/barcode-scanning',
    },
  ];

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']); // Ajusta la ruta según tu configuración
  }

  goToProfile() {
    this.router.navigate(['/profile']); // Ajusta la ruta a tu página de perfil
  }
}
