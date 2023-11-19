import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent implements OnInit {
   months: { [key: string]: number } = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
  };
  reachedTask: any;
  reactiveForm!: FormGroup;
  input: String = '';
  user:any
  constructor(
    public taskService: TaskService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.reachedTask = this.taskService.getEditTask();
    this.reactiveForm = this.fb.group({
      title: [this.reachedTask.title],
      description: [this.reachedTask.description],
      comment: [''],
      selectedOption:[this.reachedTask.status],
      priority:[this.reachedTask.priority],
      date:['']
    });
    
    console.log('reached Tasks are', this.reachedTask);
  }
  save(e: any) {
    const val = document.getElementById('comment') as HTMLInputElement;
    console.log(val.value);
    this.reachedTask.comments.unshift(val.value);
    val.value = '';
    console.log(this.reachedTask.comments);
  
  }
  handleDialog(){
    
  }
  ngOnInit(): void {
    if(this.reachedTask.userId != this.reachedTask.assignedBy)
    {
      const params = new HttpParams().set("userId",this.reachedTask.assignedBy)
      this.http.get<any>("http://localhost:8080/getUser",{params}).subscribe((res)=>{
        console.log(res)
        this.user = res 
      })
    }

    this.reactiveForm.get('title')?.valueChanges.subscribe((res)=>{
      console.log(res)
      this.reachedTask.title = res
    })
    this.reactiveForm.get('description')?.valueChanges.subscribe((res)=>{
      this.reachedTask.description = res
    })
    this.reactiveForm.get('selectedOption')?.valueChanges.subscribe((res)=>{
      console.log(res)
      this.reachedTask.status = res
    })
    this.reactiveForm.get('date')?.valueChanges.subscribe((res)=>{
      let x = res.toString()
      this.reachedTask.dueDate = x.slice(11,15)+"-"+this.months[x.slice(4,7)]+"-"+ x.slice(8,10)  
      console.log(x)
    })
    this.reactiveForm.get('priority')?.valueChanges.subscribe((res)=>{
      console.log(res)
      this.reachedTask.priority = res
    })
  }
}
