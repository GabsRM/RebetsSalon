import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '404',
    title: '404',
    component: NotFoundComponent,
  },
  {
    path: '403',
    title: '403',
    component: ForbiddenComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
