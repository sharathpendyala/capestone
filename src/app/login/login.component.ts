import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
interface myI{
  role:String,
  loggedin:String
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  reactiveForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient,private router:Router,private toastr: ToastrService) {
    localStorage.removeItem("userId")
    localStorage.removeItem("role")
    this.reactiveForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }
  handleInput() {
    console.log(this.reactiveForm.value);
    const params = new HttpParams().set("email",this.reactiveForm.value.email)
    .set("password",this.reactiveForm.value.password)
    const options = {params}
    const url = 'http://localhost:8080/login';
    this.http.get<any>(url,options).subscribe((res)=>{

      console.log(res)
      if(res.userId){
        console.log("localStorage has been set!")
        localStorage.setItem("userId",res.userId.toString())
        localStorage.setItem("role",res.role.toString())
        this.toastr.success("logged in!")
        this.router.navigate(['home'])
      }
      else{
      console.log("localstorage is cleared!")
        localStorage.clear();
        this.toastr.error("Enter Valid Credentials")
      }
    })
  }
}
