import { IonicModule } from '@ionic/angular';
import { PaymentWidgetComponent } from './payment-widget/payment-widget.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationWidgetComponent } from './notification-widget/notification-widget.component';


const components = [PaymentWidgetComponent,NotificationWidgetComponent]
@NgModule({
  exports:[components],
  declarations: [components],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class WidgetsModule { }
