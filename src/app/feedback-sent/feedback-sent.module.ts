import { RouterModule } from '@angular/router';
import { BaseComponentsModule } from './../base-components/base-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackSentPageRoutingModule } from './feedback-sent-routing.module';

import { FeedbackSentPage } from './feedback-sent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackSentPageRoutingModule,
    BaseComponentsModule,
    RouterModule
  ],
  declarations: [FeedbackSentPage]
})
export class FeedbackSentPageModule {}
