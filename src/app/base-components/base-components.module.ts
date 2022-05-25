import { IonicModule } from '@ionic/angular';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';


const Components = [HeaderComponent]
@NgModule({
  exports:[Components],
  declarations: [Components],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class BaseComponentsModule { }
