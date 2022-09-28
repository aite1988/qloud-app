import { Component, Input } from '@angular/core';

/**
 * Generated class for the IconWidgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'icon-circle',
  templateUrl: 'icon-circle.html',
})
export class IconCircleWidget {

  @Input() public color: string; // this is typed as string, but you can use any type you want
  @Input() public icon: string; // this is typed as string, but you can use any type you want

  constructor() {
   // this.varName="";
  }

  iconColor()
  {
    
   return {"color":"white","background-color":this.color,"border-radius":"25px","width":"40px","height":"40px"};
  }
}
