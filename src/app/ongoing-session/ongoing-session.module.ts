import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { OngoingSessionPageRoutingModule } from './ongoing-session-routing.module';

import { OngoingSessionPage } from './ongoing-session.page';
import { BaseComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OngoingSessionPageRoutingModule,
    BaseComponentsModule,
    RoundProgressModule
  ],
  declarations: [OngoingSessionPage]
})
export class OngoingSessionPageModule {}
