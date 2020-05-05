import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebScrapper 2';
  description = 'Second lab made by Dana Zhetesova, p3317.\n' +
    'This service provides you two functions: watching content of a web page\nand download.' +
    'You need to provide URL of web page you are going to scrap.\nTo download you can specify file name and it\'s type.\n' +
    'Enjoy!';

  viewText = 'Here will be scrapped text...';

  public OnShow(eventValue: any) {
    this.viewText = eventValue;
  }
}
