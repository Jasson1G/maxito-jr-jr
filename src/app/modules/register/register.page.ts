import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Location } from '@angular/common';
import { LocationService } from 'src/app/location.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  selectedRegion: any;
  selectedCommune: any;
  regions: any[] = [];
  communes: any[] = [];
  nombreCompleto: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private location: Location,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.loadRegions();
  }

  loadRegions() {
    this.locationService.getRegions().subscribe((data: any) => {
      this.regions = data.data;
    });
  }

  loadCommunesByRegion() {
    if (this.selectedRegion) {
      this.locationService.getCommunesByRegion(this.selectedRegion).subscribe((data: any) => {
        this.communes = data.data;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  async register() {
    // Verifica si el nombre de usuario ya existe en las preferencias
    try {
      const existingUsernameString = await Preferences.get({ key: 'user.username' });

      if (existingUsernameString.value !== null) {
        const existingUsername = existingUsernameString.value;

        if (existingUsername === this.username) {
          // El nombre de usuario ya existe, muestra un mensaje emergente
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'El nombre de usuario ya está registrado.',
            buttons: ['OK'],
          });

          await alert.present();
          return;
        }
      }
    } catch (error) {
      console.error('Error al verificar el nombre de usuario existente:', error);
    }

    // El nombre de usuario no existe, procede con el registro
    const loading = await this.loadingController.create({
      message: 'Registrando...',
      translucent: true,
      cssClass: 'custom-loading',
    });

    await loading.present(); // Muestra la ventana emergente de carga

    // Guarda los datos en las preferencias (nombre completo, nombre de usuario, contraseña, región y comuna)
    try {
      await Preferences.set({ key: 'user.nombreCompleto', value: this.nombreCompleto });
      await Preferences.set({ key: 'user.username', value: this.username });
      await Preferences.set({ key: 'user.password', value: this.password });

      // Guarda la región y la comuna seleccionadas si existen
      if (this.selectedRegion) {
        await Preferences.set({ key: 'user.selectedRegion', value: this.selectedRegion });
      }

      if (this.selectedCommune) {
        await Preferences.set({ key: 'user.selectedCommune', value: this.selectedCommune });
      }

      // Simula una espera de 1 segundo antes de redirigir
      setTimeout(async () => {
        loading.dismiss(); // Cierra la ventana emergente de carga
        console.log('Datos guardados con éxito:', this.nombreCompleto, this.username, this.password);
        console.log('Región seleccionada:', this.selectedRegion);
        console.log('Comuna seleccionada:', this.selectedCommune);
        // Redirige a la página de inicio de sesión
        await this.navCtrl.navigateRoot('/login');
      }, 1000); // Tiempo de espera de 1 segundo
    } catch (error) {
      console.error('Error al guardar los datos de registro:', error);
      loading.dismiss(); // Cierra la ventana emergente de carga en caso de error
    }
  }
}
