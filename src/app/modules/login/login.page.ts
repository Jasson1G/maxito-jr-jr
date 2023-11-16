import { RecoverPasswordModalPage } from '../recover-password-modal/recover-password-modal.page';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
  ) {}

  async login() {
    // Mostrar un mensaje de carga
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      translucent: true,
      cssClass: 'custom-loading',
    });

    await loading.present();

    try {
      // Obtén los datos de usuario desde las Preferencias de Capacitor
      const usernameDataString = await Preferences.get({ key: 'user.username' });
      const passwordDataString = await Preferences.get({ key: 'user.password' });

      if (usernameDataString.value !== null && passwordDataString.value !== null) {
        const username = usernameDataString.value;
        const password = passwordDataString.value;

        if (username === this.username && password === this.password) {
          // Credenciales válidas, redirigir al home
          this.navCtrl.navigateRoot('/home');
        } else {
          // Credenciales inválidas, mostrar un mensaje de error como Toast
          this.presentToast('Credenciales incorrectas. Por favor, inténtelo de nuevo.', 'danger');
        }
      } else {
        // No se encontraron datos de usuario o el valor es nulo
        this.presentToast('No se encontraron datos de usuario o el valor es nulo', 'danger');
      }
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
      this.presentToast('Error al iniciar sesión', 'danger');
    } finally {
      if (loading) {
        loading.dismiss(); // Cierra el mensaje de carga después de verificar las credenciales
      }
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      translucent: true,
      cssClass: 'custom-loading',
    });
    await this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  goToRegister() {
    this.showLoading();
    setTimeout(() => {
      this.router.navigate(['/register']);
      this.dismissLoading();
    }, 2000);
  }

  async openRecoverPasswordModal() {
    const modal = await this.modalController.create({
      component: RecoverPasswordModalPage,
    });
    await modal.present();
  }
}
