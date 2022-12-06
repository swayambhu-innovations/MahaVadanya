import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  
  public LoggedInUser: boolean;
  public user: any;

  constructor() { }

  public admission:any;
}
