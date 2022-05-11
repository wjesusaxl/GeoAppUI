import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './login/pages/main/main.component';
import { FrameComponent } from './login/pages/frame/frame.component';

@NgModule({
  declarations: [
    MainComponent,
    FrameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FrameComponent
  ]
})
export class FeaturesModule { }
