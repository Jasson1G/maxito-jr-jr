import { Component } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-recover-password-modal',
  templateUrl: 'recover-password-modal.page.html',
  styleUrls: ['recover-password-modal.page.scss'],
})
export class RecoverPasswordModalPage {
  username: string = '';
  newPassword: string = '';

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.username = this.navParams.get('username') || '';
  }

  async recoverPassword() {
    try {
      // Obtiene la contraseña actual del usuario desde las preferencias
      const existingPasswordString = await Preferences.get({ key: 'user.password' });
      const existingPassword = existingPasswordString.value;

      if (existingPassword !== null) {
        if (existingPassword === this.newPassword) {
          // La nueva contraseña es igual a la contraseña actual
          this.presentToast('La nueva contraseña es igual a la contraseña actual.', 'danger');
        } else {
          // Guarda la nueva contraseña en las preferencias
          await Preferences.set({ key: 'user.password', value: this.newPassword });

          // Muestra un mensaje de éxito
          this.presentToast('La contraseña se ha cambiado exitosamente.', 'success');

          // Cierra la página modal y pasa cualquier dato necesario de vuelta a la página anterior si es necesario
          this.modalController.dismiss({
            newPassword: this.newPassword,
          });
        }
      } else {
        // No se encontró una contraseña en las preferencias
        this.presentToast('La contraseña no pudo ser recuperada.', 'danger');
      }
    } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
      this.presentToast('Error al recuperar la contraseña.', 'danger');
    }
  }

  dismissModal() {
    this.modalController.dismiss();
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
}
