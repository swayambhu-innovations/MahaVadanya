import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';


const components1 = [HeaderComponent,InputComponent]
@NgModule({
  exports:[components1],
  declarations: [components1],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class BaseComponentsModule { }
