import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookseva',
  templateUrl: './bookseva.page.html',
  styleUrls: ['./bookseva.page.scss'],
})
export class BooksevaPage implements OnInit {
  selected: Date | null;
  constructor() { }

  ngOnInit() {
  }
  public customFormatter(value: number) {
    console.log(value);
    if(value < 12){
      return `${value}:00 AM`;
    }else if(value > 12){
      return `${value}:00 PM`;
    }else if(value === 12){
      return `${value}:00 Noon`;
    }
  }
}
