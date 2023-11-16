import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterPage],
        imports: [IonicModule.forRoot(), RouterTestingModule], // Importa RouterTestingModule para las pruebas de enrutamiento
      }).compileComponents();

      fixture = TestBed.createComponent(RegisterPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  
  
});
