import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { LocationService } from 'src/app/location.service';
import { ActivatedRoute } from '@angular/router';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  isSupported = false;
  barcodes: Barcode[] = [];
  username: string = '';
  nombreCompleto: string = '';
  profileImage: string = '';
  selectedRegion: number = 0;
  selectedCommune: number = 0;
  selectedRegionName: string = '';
  selectedCommuneName: string = '';
  regions: any[] = [];
  communes: any[] = [];
  latitude: number = 0;
  longitude: number = 0;

  // Datos escaneados del código QR
  nombreProfesor: string = '';
  hora: string = '';
  sala: string = '';
  dia: string = '';

  constructor(
    private navCtrl: NavController,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    this.loadUserData();
    this.loadProfileImage();
    this.loadRegions();
    this.route.queryParams.subscribe((params) => {
      this.nombreProfesor = params['nombreProfesor'];
      this.hora = params['hora'];
      this.sala = params['sala'];
      this.dia = params['dia'];
    });
  }

  async loadUserData() {
    try {
      const usernameString = await Preferences.get({ key: 'user.username' });
      const nombreCompletoString = await Preferences.get({ key: 'user.nombreCompleto' });
      const selectedRegionString = await Preferences.get({ key: 'user.selectedRegion' });
      const selectedCommuneString = await Preferences.get({ key: 'user.selectedCommune' });

      if (usernameString.value && nombreCompletoString.value) {
        this.username = usernameString.value;
        this.nombreCompleto = nombreCompletoString.value;
      }

      if (selectedRegionString.value) {
        this.selectedRegion = parseInt(selectedRegionString.value, 10);
      }

      if (selectedCommuneString.value) {
        this.selectedCommune = parseInt(selectedCommuneString.value, 10);
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  async loadProfileImage() {
    try {
      const profileImageString = await Preferences.get({ key: 'user.profileImage' });
      if (profileImageString.value) {
        this.profileImage = profileImageString.value;
      }
    } catch (error) {
      console.error('Error al cargar la imagen de perfil:', error);
    }
  }

  async loadRegions() {
    this.locationService.getRegions().subscribe((data: any) => {
      this.regions = data.data;
      this.loadCommunesByRegion(this.selectedRegion);
    });
  }

  loadCommunesByRegion(regionId: number) {
    if (regionId) {
      this.locationService.getCommunesByRegion(regionId).subscribe((data: any) => {
        this.communes = data.data;
      });
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        source: CameraSource.Camera,
        resultType: CameraResultType.Uri,
      });
  
      if (image && image.webPath) {
        // Voltear horizontalmente la imagen para simular la cámara frontal
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
  
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.translate(img.width, 0);
          ctx?.scale(-1, 1);
          ctx?.drawImage(img, 0, 0, img.width, img.height);
          this.profileImage = canvas.toDataURL('image/jpeg');
        };
  
        img.src = image.webPath;
      } else {
        console.error('La imagen capturada no contiene una ruta web válida.');
      }
    } catch (error) {
      console.error('Error al tomar una foto:', error);
    }
  }
  

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  async getPermissionAndGeolocation() {
    try {
      const coordinates: GeolocationPosition = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log(`Latitud: ${this.latitude}, Longitud: ${this.longitude}`);
    } catch (error) {
      console.error('Error al obtener la geolocalización:', error);
    }
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
