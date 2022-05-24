import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetailsPageRoutingModule } from './add-details-routing.module';

import { AddDetailsPage } from './add-details.page';
import { BaseComponentsModule } from '../components/components.module';
import { ModalModule } from '../_modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDetailsPageRoutingModule,
    BaseComponentsModule,ModalModule
  ],
  declarations: [AddDetailsPage]
})
export class AddDetailsPageModule {}
