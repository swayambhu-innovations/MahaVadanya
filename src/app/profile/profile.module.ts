import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './profile-routing.module';

import { EditProfilePage } from './profile.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
    BaseComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ EditProfilePage ],
})
export class EditProfilePageModule {}
