import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionEndedPageRoutingModule } from './session-ended-routing.module';

import { SessionEndedPage } from './session-ended.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionEndedPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [SessionEndedPage]
})
export class SessionEndedPageModule {}
