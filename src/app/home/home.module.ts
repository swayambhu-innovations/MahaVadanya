import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
// import { BaseComponentsModule } from '../base-components/base-components.module';
// import { BaseComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BaseComponentsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
