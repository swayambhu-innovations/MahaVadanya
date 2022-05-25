import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';
import { BaseComponentsModule } from '../components/components.module';
import { EditProfilePage } from './edit-profile.page';
import { ModalModule } from '../_modal';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
    
    BaseComponentsModule,ModalModule
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
