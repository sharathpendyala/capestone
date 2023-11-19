import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  notification:boolean = false
  constructor(private taskService:TaskService){
      if(this.taskService.notification)
        this.notification = true     
  }
}
