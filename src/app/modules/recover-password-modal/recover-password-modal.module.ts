import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverPasswordModalPageRoutingModule } from './recover-password-modal-routing.module';

import { RecoverPasswordModalPage } from './recover-password-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverPasswordModalPageRoutingModule
  ],
  declarations: [RecoverPasswordModalPage]
})
export class RecoverPasswordModalPageModule {}
