import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivesevaPageRoutingModule } from './activeseva-routing.module';

import { ActivesevaPage } from './activeseva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivesevaPageRoutingModule
  ],
  declarations: [ActivesevaPage]
})
export class ActivesevaPageModule {}
