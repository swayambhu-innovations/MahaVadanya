import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InactivesevaPageRoutingModule } from './Inactiveseva-routing.module';

import { InactiveSevaPage } from './Inactiveseva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InactivesevaPageRoutingModule
  ],
  declarations: [InactiveSevaPage]
})
export class InactivesevaPageModule {}
