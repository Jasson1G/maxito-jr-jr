import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Agregar un temporizador de 10 segundos
    setTimeout(() => {
      // Redirigir a la página "login"
      this.router.navigateByUrl('/login');
    }, 10000); // 6000 milisegundos = 10 segundos
  }
}
