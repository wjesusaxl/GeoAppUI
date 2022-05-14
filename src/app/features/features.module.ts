import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './login/pages/main/main.component';
import { FrameComponent } from './login/pages/frame/frame.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    FrameComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    FrameComponent
  ]
})
export class FeaturesModule { }
