import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../service/data.service";

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
    constructor(private router:Router,private userlog:UserService) { }

    ngOnInit() {}

    signin(){
        console.log("vvv")
        this.router.navigate(['/main']);
    }
    testLogin(username,password){
        this.userlog.login(username,password);
    }
}
