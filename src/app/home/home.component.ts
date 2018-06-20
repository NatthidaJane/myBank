import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../service/data.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };
    user={
        username:'',
        password:''
    }
    loginfail=false;
    constructor(private router:Router,private userlog:UserService) { }

    ngOnInit() {}

    signin(){
        console.log("vvv")
        this.router.navigate(['/main']);
    }
    login(username,password){
        this.userlog.login(username,password)
        .then((resp)=>{
            let data = resp
            console.log(resp)
            this.userlog.user=resp
            console.log(this.userlog.user);
            
            this.loginfail=false;
            this.router.navigate(['/main']);
        })
        .catch((err: HttpErrorResponse)=>{
            console.log(err);
            console.log(err.status);
            this.loginfail=true;
        })
    }
}
