import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
   tasks :Array<any> = []
   length!:number 
   constructor(private taskService:TaskService){
    this.taskService.getTasks().subscribe((res)=>{
      this.tasks = res
      this.length = this.tasks.length
      console.log(this.tasks)
    })
   }

}
