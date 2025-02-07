import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './pages';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { JwtInterceptor } from 'src/app/utils';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FaqComponent } from './pages/faq/faq.component';

@NgModule({
  declarations: [DashboardComponent, FaqComponent],
  imports: [CommonModule, NgChartsModule, HomeRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class HomeModule {}
