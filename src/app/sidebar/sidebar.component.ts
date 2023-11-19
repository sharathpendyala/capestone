import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  current!:string
  localRole!:any
  constructor(private route:ActivatedRoute,private toastr:ToastrService,private router:Router){
    this.localRole = localStorage.getItem("role")
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.current = this.router.url;
      }
    });
  }
  ngOnInit(){
  }
  fxn(passed:any){
    this.current = passed
    if(localStorage.getItem("role") == 'admin')
      this.router.navigate(['home/dashboard'])
    else 
      this.toastr.error("Sorry! U have no access")
  }


}
