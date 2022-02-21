import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivesevaPageRoutingModule } from './activeseva-routing.module';

import { ActivesevaPage } from './activeseva.page';
import { BasecomponentsModule } from 'src/app/basecomponents/basecomponents.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivesevaPageRoutingModule,
    BasecomponentsModule,
    RoundProgressModule
  ],
  declarations: [ActivesevaPage]
})
export class ActivesevaPageModule {}
