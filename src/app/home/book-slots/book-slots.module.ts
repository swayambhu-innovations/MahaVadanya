import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookSlotsPageRoutingModule } from './book-slots-routing.module';

import { BookSlotsPage } from './book-slots.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookSlotsPageRoutingModule
  ],
  declarations: [BookSlotsPage]
})
export class BookSlotsPageModule {}
