import { Component, OnInit } from '@angular/core';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TaskService } from '../task.service';
import { HttpClient } from '@angular/common/http';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  eventsArray:Array<any> = []
  constructor(private taskService:TaskService,private http:HttpClient){
  //   this.http.get <Array<any>>("http://localhost:8080/getAllTasks").subscribe((res)=>{
  //     res.forEach((obj)=>{
  //        if(obj.dueDate && obj.dueDate!='')
  //        {
  //          let o = {
  //            title:obj.title,
  //            date:obj.dueDate
  //          }
  //          this.eventsArray.push(o)
  //        }
  //     })
   
  //     console.log(this.eventsArray)
  //  })
}
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    // dateClick: this.handleDateClick.bind(this), // bind is important!
    // events: this.eventsArray,
  }
  // handleDateClick(arg:any) {
  //   console.log("hi")
  //   alert('date click! ' + arg.dateStr)
  // }
 
  

  ngOnInit(){
    this.eventsArray = this.taskService.eventsArray
    console.log(this.eventsArray)
    


  }
}
