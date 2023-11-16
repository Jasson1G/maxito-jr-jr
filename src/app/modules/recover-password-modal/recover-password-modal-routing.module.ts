import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverPasswordModalPage } from './recover-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverPasswordModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverPasswordModalPageRoutingModule {}
