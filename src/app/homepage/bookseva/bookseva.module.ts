import { BasecomponentsModule } from './../../basecomponents/basecomponents.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksevaPageRoutingModule } from './bookseva-routing.module';

import { BooksevaPage } from './bookseva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksevaPageRoutingModule,
    BasecomponentsModule
  ],
  declarations: [BooksevaPage]
})
export class BooksevaPageModule {}
