import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
// import {RoundProgressModule} from 'angular-svg-round-progressbar';

import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { OngoingSessionPageRoutingModule } from './ongoing-session-routing.module';
import {  } from '@angular/material';
import { OngoingSessionPage } from './ongoing-session.page';
// import { BaseComponentsModule } from '../components/components.module';
import { ModalModule } from '../_modal';
import { BaseComponentsModule } from '../base-components/base-components.module';
// import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OngoingSessionPageRoutingModule,
BaseComponentsModule,
    RoundProgressModule,ModalModule,
  
  ],
  declarations: [OngoingSessionPage]
})
export class OngoingSessionPageModule {}
