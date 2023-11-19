import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuardGuard } from './auth-guard.guard';
import { TasksdisplayComponent } from './tasksdisplay/tasksdisplay.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { CalenderComponent } from './calender/calender.component';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
  {
    path:"register",
    component:SigninComponent
  },
  {
    path:"home",
    canActivate:[authGuardGuard],
    component:HomeComponent,
    children:[
      {
        path:"",
        component:TasksdisplayComponent
      },
      {
        path:"dashboard",
        canActivate:[authGuardGuard],
        component:DashboardComponent
      },
      {
        path:"logout",
        component:LogoutComponent
      },
      {
        path:"events",
        component:CalenderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
