import { IonicModule } from '@ionic/angular';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SlotsComponent } from './slots/slots.component';
import { InputComponent } from './input/input.component';


const components = [HeaderComponent,SlotsComponent,InputComponent];
@NgModule({
  exports:[components],
  declarations: [components],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class BaseComponentsModule { }
