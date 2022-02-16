import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksevaPageRoutingModule } from './bookseva-routing.module';

import { BooksevaPage } from './bookseva.page';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { BooksevaService } from 'src/app/Services/bookseva.service';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksevaPageRoutingModule,
    MatDatepickerModule,MatCardModule,MatNativeDateModule, MatInputModule
  ],
  declarations: [BooksevaPage],
  providers: [BooksevaService]
})
export class BooksevaPageModule {}
