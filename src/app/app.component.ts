import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storage: Storage) {}

  async ngOnInit() {
    // Llama a create() para crear la base de datos antes de acceder a ella
    await this.storage.create();

    // Ahora puedes realizar operaciones de almacenamiento, por ejemplo:
    await this.storage.set('clave', 'valor');
    const valor = await this.storage.get('clave');
    console.log('Valor recuperado:', valor);
  }
}