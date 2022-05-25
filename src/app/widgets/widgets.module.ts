import { PaymentWidgetComponent } from './payment-widget/payment-widget.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const components = [PaymentWidgetComponent]
@NgModule({
  exports:[components],
  declarations: [components],
  imports: [
    CommonModule
  ]
})
export class WidgetsModule { }
