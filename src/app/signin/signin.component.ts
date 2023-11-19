import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  reactiveForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient,private toastr:ToastrService,private router:Router) {
    this.reactiveForm = this.fb.group({
      firstName: [''],
      lastName:[''],
      email: [''],
      password: [''],
      phno:[''],
      role:['']
    });
  }
  handleInput() {
    const url = 'http://localhost:8080/register';

    this.http.post <any>(url, this.reactiveForm.value).subscribe((response) => {
       if(response.response){
        this.toastr.success("Signin Successful!")
        this.router.navigate([''])
       }
       else{
        this.toastr.error("User Already exists")
       }
    });
  }
}
