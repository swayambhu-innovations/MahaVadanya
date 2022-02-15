import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Activeseva1PageRoutingModule } from './activeseva1-routing.module';

import { Activeseva1Page } from './activeseva1.page';
import { BasecomponentsModule } from 'src/app/basecomponents/basecomponents.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Activeseva1PageRoutingModule,
    BasecomponentsModule,
    RoundProgressModule
  ],
  declarations: [Activeseva1Page]
})
export class Activeseva1PageModule {}
