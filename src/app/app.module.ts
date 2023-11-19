import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import { TasksdisplayComponent } from './tasksdisplay/tasksdisplay.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { LogoutComponent } from './logout/logout.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalenderComponent } from './calender/calender.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SigninComponent,
    HomeComponent,
    TasksdisplayComponent,
    EditTaskDialogComponent,
    SidebarComponent,
    DashboardComponent,
    LogoutComponent,
    CalenderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
