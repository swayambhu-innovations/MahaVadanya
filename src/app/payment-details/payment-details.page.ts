import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {

  price: number = 1;
  WindowRef:any;
  orderId:string = '' ;
  constructor() { }

  ngOnInit() {
  }


  pay() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "amount": 5000
    });

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://us-central1-sit-manager.cloudfunctions.net/createOrder", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }

  get MainWindowRef() {
    return window;
  }


  preparePaymentDetails(order: any, orderDetails: any) {
    var ref = this;
    this.orderId = order.id;
    return {
      key: environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: orderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      name: 'Pay',
      currency: order.currency,
      order_id: order.id, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      image: 'https://madhavseva.com/assets/Images/logo.png',
      handler: function (response: any) {
        ref.handlePayment(response);
      },
      
      theme: {
        color: '#ffc670',
      },
    };
  }
  handlePayment(response: any) {
    // this.capturePayment({
    //   amount: this.currentOrderDetail.price * 100,
    //   payment_id: response.razorpay_payment_id,
    // }).subscribe((res: any) => {
    //   if (res.res.statusCode) {
    //     // console.log("Current order detail",this.currentOrderDetail)
    //     this.addBooking(this.currentOrderDetail, JSON.parse(res.body).id);
    //     // console.log("Booking razorpya data",res);
    //     this.presentToast('Payment Successful.');
    //     this.dataProvider.blur = false;
    //     this.sevaForm.reset();
    //     $('#sevaForm').modal('hide');
    //     this.showModal = true;
    //   } else {
    //     this.dataProvider.blur = false;
    //     this.toastMessage(
    //       'Some error occured please retry your payment. Or please contact +91-9026296062',
    //       10000
    //     );
    //   }
    // });
  }

  proceedPayment(event: any) {
    let receiptNumber = `Receipt#${Math.floor(Math.random() * 5123 * 43) + 10}`;
    let orderDetails = {
      amount: this.price * 100,
      receipt: receiptNumber,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "amount": 5000
    });

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    this.WindowRef = this.MainWindowRef;
    fetch("https://us-central1-sit-manager.cloudfunctions.net/createOrder", requestOptions)
      .then(response => {
        response.json();
        
        var rzp1 = new this.WindowRef.Razorpay(
          this.preparePaymentDetails(response.json(), orderDetails)
        );
        // this.dataProvider.blur = false;
        alert('Finish')
        rzp1.open();
        event.preventDefault();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));




    // this.createOrder(orderDetails).subscribe(
    //   (order) => {
    //     // console.log("Payment details",order)
    //     var rzp1 = new this.WindowRef.Razorpay(
    //       this.preparePaymentDetails(order, orderDetails)
    //     );
    //     this.dataProvider.blur = false;
    //     rzp1.open();
    //     event.preventDefault();
    //   },
    //   (error) => {
    //     this.toastMessage(error.message);
    //     this.dataProvider.blur = false;
    //   }
    // );
  }




}
