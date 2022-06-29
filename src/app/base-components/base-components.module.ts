import { IonicModule } from '@ionic/angular';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SlotsComponent } from './slots/slots.component';
import { InputComponent } from '../components/input/input.component';
import { RouterModule } from '@angular/router';

const components = [HeaderComponent, SlotsComponent, InputComponent];
@NgModule({
  exports: [components],
  declarations: [components],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class BaseComponentsModule {}
