import { DialogRef } from '@angular/cdk/dialog';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { TaskService } from '../task.service';
import { ToastrService } from 'ngx-toastr';
import { an } from '@fullcalendar/core/internal-common';
class Task {
  userId: any = localStorage.getItem("userId");
  title: string = '';
  description: string = '';
  dueDate: string = '';
  status: string = '';
  assignee: string = '';
  comments: string[] = [];
  attachments: string[] = [];
  assignedBy:string = '';
  assignedTo:string = '';
  priority: string = '';
}
@Component({
  selector: 'app-tasksdisplay',
  templateUrl: './tasksdisplay.component.html',
  styleUrls: ['./tasksdisplay.component.css'],
})
export class TasksdisplayComponent implements OnInit {
  tasks: Array<any> = [];
  tasks1: Array<any> = [];
  tasks2:Array<any> = [];
  assignedTasks:Array<any> = []
  addTaskClicked: boolean = false;
  clickedIn1:string = 'ToDo'
  clickedIn2:string = 'InProgress'
  clickedIn3:string = 'Done'
  newTask = new Task();
  users:Array<any> = []
  local:any = localStorage.getItem("userId")
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private taskService: TaskService,
    private toastr:ToastrService
  ) {}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((res) => {
      this.tasks = res;
      this.taskService.tasksArray = this.tasks
      console.log(this.tasks);
      this.tasks.forEach((obj)=>{
        if((obj.assignedTo &&  obj.assignedTo != '') && (obj.assignedBy && obj.assignedBy != this.local))
        {
          this.assignedTasks.push(obj)
        }
      })
      console.log(this.assignedTasks)
      
    });
  }
  handleTask(task: any) {
    this.taskService.seteditTask(task);
    const dialogRef = this.dialog.open(EditTaskDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log("Due date",result.dueDate);
      let obj = {
        title:result.title,
        date:result.dueDate
      }
      this.taskService.eventsArray.push(obj)
      console.log(this.taskService.eventsArray)
      this.http
        .put('http://localhost:8080/editTask', result)
        .subscribe((res) => {
          console.log(res);
          this.getAllTasks();
        });
    });
  }
  handleInput(e:any){
    console.log(e)
  }
  handleTitle(e: any) {
    console.log(e);
    const inputEle = document.getElementById("dynamicInput") as HTMLInputElement
    if (inputEle.value) 
    {
      this.addTask(inputEle.value,e)
    }
    this.addTaskClicked = false;
    if(e == 'ToDo')
    this.clickedIn1 = e
    else if(e == 'InProgress')
    this.clickedIn2 = e
    else
    this.clickedIn3 = e
  }

  addTask(title:string,passed: string) {
    if (this.addTaskClicked) {
      this.newTask.title = title
      this.newTask.status = passed
      console.log(this.newTask);
      this.http
        .post<any>('http://localhost:8080/addTask', this.newTask)
        .subscribe((res) => {
          // console.log(res);
          console.log('updating');
          this.getAllTasks()
           
        });
    }
    this.addTaskClicked = true;
    if(passed == 'ToDo')
    this.clickedIn1 = ''
    else if(passed == 'InProgress')
    this.clickedIn2 = '' 
    else
    this.clickedIn3 = ''
  }
   getAllTasks() {
    console.log("hi")
    this.taskService.getTasks().subscribe((res) => {
      this.tasks = res;
    });
  }
  assignToUser(user:any,task:any){
    // console.log(user.target)
    if(localStorage.getItem(task.assignedTo))
      this.toastr.error("U have already assigned the task")
    else{
      if(user.userId == this.local)
        this.toastr.error("U cant assign to self")
      else{
        this.toastr.success(`Assigned to ${user.firstName}`)
        
        task.assignedTo = user.userId
        task.assignedBy = task.userId
        console.log("assigned task is",task)      
        this.http
          .put('http://localhost:8080/editTask', task)
          .subscribe((res) => {
            console.log(res);
            this.getAllTasks();
          });
      }
    }
  }
  assignTo(){
    this.http.get<Array<any>>("http://localhost:8080/getUsers").subscribe((res) =>{
      this.users = res
      console.log("users are:",this.users)
    })
  }

  onDrop(e: CdkDragDrop<String[]>) {
    if (e.previousContainer == e.container) {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
    } else {
      transferArrayItem(
        e.previousContainer.data,
        e.container.data,
        e.previousIndex,
        e.currentIndex
      );
    }
    const obj:any = e.container.data[e.currentIndex]
    console.log(e.container.data[e.currentIndex])
    console.log(e.previousContainer.id,e.container.id)
    
    if(e.container.id === 'cdk-drop-list-0')
      obj.status = 'ToDo'
    else if(e.container.id === 'cdk-drop-list-1')
      obj.status = 'InProgress'
    else if(e.container.id === 'cdk-drop-list-2')
      obj.status = 'Done'
    this.http
        .put('http://localhost:8080/editTask', obj)
        .subscribe((res) => {
          console.log(res);
          this.getAllTasks();
        });
  }

  example(e:any){
    console.log(e)
  }
}
