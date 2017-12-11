import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes:Routes = [
 
    {path: 'heroes', component: HeroesComponent},

    {path: 'dashboard', component: DashboardComponent},
    //làm cho ứng dụng tự động điều hướng đến trang tổng quan
    {path: '', redirectTo: '/dashboard', pathMatch:'full'},
    {path: 'detail/:id',component:HeroDetailComponent}

  
]; 
//hoàn tất thiết lập, router sẽ khớp URL đó với path: 'heroes' và hiển thị HeroesComponent.


@NgModule({
  exports: [
    RouterModule
  ],
  imports:[
    RouterModule.forRoot(routes)
  ]

})
export class AppRoutingModule { }
