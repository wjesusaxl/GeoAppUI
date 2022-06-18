import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './login/pages/main/main.component';
import { FrameComponent } from './login/pages/frame/frame.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/pages/home/home.component';
import { ProjectSelectionMainComponent } from './project-selection/pages/project-selection-main/project-selection-main.component';
import { ProjectComponent } from './project-selection/pages/project/project.component';

@NgModule({
  declarations: [
    MainComponent,
    FrameComponent,
    HomeComponent,
    ProjectSelectionMainComponent,
    ProjectComponent
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
