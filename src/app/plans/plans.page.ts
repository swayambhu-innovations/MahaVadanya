import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from '../providers/data.provider';
import { AdmissionService } from '../services/admission/admission.service';
import { DataProviderService } from '../services/dataProvider/data-provider.service';
import { PlanService } from '../services/plan/plan.service';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { UserService } from '../services/user/user.service';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  public monthValue: any = 1;
  public allPlans: any[] = []

  constructor(private admission: AdmissionService, private plan: PlanService, private dataProvider: DataProviderService, private router:Router, private alertify: AlertsAndNotificationsService) { }

  ngOnInit() {
    this.plans();
    // this.planChange();

  }

  onIonChange(ev: Event) {
    this.monthValue = (ev as RangeCustomEvent).detail.value;
    console.log(this.monthValue)
    // this.planChange();
  }

  plans() {
    this.admission.plans().then((res) => {
      res.forEach((element: any) => {
        this.allPlans.push({
          ...element.data(),
          id: element.id,
        });
        console.log(this.allPlans)
      });
    })
  }

  async payForPlan(planType: any, planPrice: any) {
    if (planType) {
      const plan = {
        plan: {
          myPlan: planType,
          validity: 30 * this.monthValue,
          billingAmount: planPrice * this.monthValue,
          date: new Date(),
        },
        latestPlanLog : {
          myPlan: planType,
          validity: 30 * this.monthValue,
          billingAmount: planPrice * this.monthValue,
          date: new Date(),
        }

      }
      console.log(this.dataProvider.admission);
      console.log(plan);

      await this.admission.addAdmission(this.dataProvider.admission)
      await this.plan.plan(this.dataProvider?.user?.userId, { ...plan }).then((res)=>{
        this.alertify.presentToast('Registration Success');
        this.router.navigateByUrl('/admission-confirmation');
        console.log(this.dataProvider?.user)
      });
      
    }

  }


  // planChange(newplanPrice: any = 800, planType: any = "expert",) {
  //   if (planType) {

  //     let current = {

  //       oneDayOldPlan: Number(this.dataProvider?.user?.latestPlanLog.billingAmount)/Number(this.dataProvider?.user?.latestPlanLog?.validity),
  //       currentDaysPrice: (Number(this.dataProvider?.user?.latestPlanLog.billingAmount)/Number(this.dataProvider?.user?.latestPlanLog?.validity)) * Number(this.dataProvider?.user?.plan.validity),
  //       dayleft:(Number(this.dataProvider?.user?.latestPlanLog.billingAmount)/Number(this.dataProvider?.user?.latestPlanLog?.validity)) * Number(this.dataProvider?.user?.plan.validity),
  //       // priceLeft: Number(this.dataProvider?.user?.latestPlanLog.billingAmount) - (Number(this.dataProvider?.user?.latestPlanLog.billingAmount/Number(this.dataProvider?.user?.plan.validity)) * Number(this.dataProvider?.user?.plan.validity))
  //     }

  //    console.log(current)


  //     const plan = {
  //       myPlan: planType,
  //       validity: ( Number(this.dataProvider?.user?.latestPlanLog.billingAmount) - 
  //                   ((Number(this.dataProvider?.user?.latestPlanLog?.billingAmount) / 
  //                   Number(this.dataProvider?.user?.latestPlanLog?.validity)) * Number(this.dataProvider?.user?.plan.validity))) / 
  //                   (Number(newplanPrice) * Number(this.monthValue) /  Number(this.dataProvider?.user?.latestPlanLog?.validity))
  //     }
      
  //     // console.log(plan)
  //   }
  // }



}