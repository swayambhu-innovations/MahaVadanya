import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera } from '@capacitor/camera';

import { Platform } from '@ionic/angular';
// import jsQR from 'jsqr';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
})
export class QrScanPage implements OnInit {

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  loading: HTMLIonLoadingElement = null;
  productId:string = ''
  interval:any;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private alertify:AlertsAndNotificationsService,private platform:Platform) { }

  ngOnInit() {
  }




  


    globalSearch() {
      
      // this.router.navigateByUrl('product-details/' + '49052825038959470');
      Camera.checkPermissions()
        .then(async (res) => {
          if (res) {
            const startScan = async () => {
              // Check camera permission
              // This is just a simple example, check out the better checks below
              await BarcodeScanner.checkPermission({ force: true });
  
              // make background of WebView transparent
              // note: if you are using ionic this might not be enough, check below
              (document.querySelector('app-root') as HTMLElement).style.display =
                'none';
              BarcodeScanner.hideBackground();
  
              const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
              
              alert(result)
              // if the result has content
              // if (result.hasContent && this.validIds.includes(result.content)) {
              //   console.log('result.content', result.content);
              //   // alert(result.content); // log the raw scanned content
              //   const stockId =
              //     this.stocksIds[this.validIds.indexOf(result.content)];
              //   const purchaseId = this.purchaseIds[this.validIds.indexOf(result.content)];
              //   console.log('purchaseId', stockId);
              //   (
              //     document.querySelector('app-root') as HTMLElement
              //   ).style.display = 'block';
              //   BarcodeScanner.showBackground();
              //   await BarcodeScanner.stopScan();
              //   this.dataProvider.purchaseProductId = result.content;
              //   this.dataProvider.purchaseId = purchaseId;
              //   this.router.navigateByUrl('product-details/' + stockId);
              //   setTimeout(() => {
              //     location.reload();
              //   }, 500);
              //   await Haptics.impact({ style: ImpactStyle.Heavy });
              //   this.alertify.presentToast('Product Found');
              // }
            };
            await startScan();
          }
        })
        .catch((err) => {
          console.log(err);
          Camera.requestPermissions().then((res) => {
            console.log(res);
          });
        });
      // this.startScan();
    }
  
  }


