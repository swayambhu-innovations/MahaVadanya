import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OngoingSessionPageRoutingModule } from './ongoing-session-routing.module';
import { OngoingSessionPage } from './ongoing-session.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';
// import { RoundprogressModule } from 'angular-svg-round-progressbar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OngoingSessionPageRoutingModule,
    BaseComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [OngoingSessionPage]
})
export class OngoingSessionPageModule {}
