import { HttpClient , HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task:any
  userId:any
  notification:any
  eventsArray:Array<any> = []
  tasksArray:Array<any> = []
   constructor(private http:HttpClient) {
    // this.tasksArray.forEach((obj)=>{
    //    if(obj.dueDate && obj.dueDate != "")
    //     this.eventsArray.push(obj.dueDate)
    // })
    // console.log(this.eventsArray)
   }
  getTasks(){
    this.userId = localStorage.getItem("userId")
    const params = new HttpParams().set("userId",this.userId)
    const options = {params}
    return this.http.get<any[]>("http://localhost:8080/getAllTasks",options)
  }
  
  seteditTask(passedTask:any){
    this.task = passedTask
  }
  getEditTask(){
    return this.task
  }
}
