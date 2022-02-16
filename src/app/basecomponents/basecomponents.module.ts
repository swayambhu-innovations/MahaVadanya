import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const components = [HeaderComponent,];
@NgModule({
  exports:[components],
  declarations: [components],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class BasecomponentsModule { }
