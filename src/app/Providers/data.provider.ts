import { Injectable } from '@angular/core';
import { PageSetting } from '../structures/method.structure';

@Injectable()
export class DataProvider{
    public data: any;
    public pageSetting: PageSetting={
        blur:false,
        lastRedirect:'',
        message:'',
        spinner:false,
        messageType:'Error'
    };
    public userData: any | undefined;
    public loggedIn = false;
    public gettingUserData = false;
    public userID: string | undefined;
    public verifyEmail: boolean | undefined;
    public reloadPage = false;
    public checkoutData: any;
    public shippingData: any;
    public dataOne: any;
    public dataTwo: any;
    public logs: any[];
    public recentActivities: any = [];
    public availabelServices: any = [];
    constructor(){}
}
