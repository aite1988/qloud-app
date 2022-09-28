import { NgModule } from '@angular/core';
import { IconCircleWidget } from './widget/icon-circle/icon-circle';
import { ImgLazyWidget } from './widget/img-lazy/img-lazy';
import { ImgLazyCircleWidget } from './widget/img-lazy-circle/img-lazy-circle';
import { LoadingWidget } from './widget/loading/loading';
import { BackdropWidget } from './widget/popup-backdrop/popup-backdrop';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule } from 'ionic-angular';

@NgModule({
	
	declarations: [IconCircleWidget,ImgLazyWidget,LoadingWidget,BackdropWidget,ImgLazyCircleWidget],
	imports: [CommonModule,IonicModule],
	bootstrap: [IonicApp],
	exports: [IconCircleWidget,ImgLazyWidget,LoadingWidget,BackdropWidget,ImgLazyCircleWidget]
})
export class ComponentsModule {}
