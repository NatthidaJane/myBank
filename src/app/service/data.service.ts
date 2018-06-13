import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../models/user.model";
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
@Injectable()
export class UserService {
  constructor(private http: Http) {}

//   loginUser() {
//     return this.http.post('')
//       .map((res: Response) => res.json().response);
//   }
// public getAllTodos(): Observable<User> {
//     return this.http
//       .get('http://localhost:8091/training/v1/callRestApiController/getRawPromtpay?type=mobile&value=0873835482')
//       .map(response => {
//         const user = response.json();
//         return user.map((data) => new User(data));
//       })
//       .catch(this.handleError);
//   }
// }
login(username:string,password:string){
    let body = JSON.stringify({
    "username": username,
    "password": password
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    console.log(this.http.post('http://localhost:8091/training/v1/callRestApiController/login',body,options).toPromise());
    return this.http.post('http://localhost:8091/training/v1/callRestApiController/login',body,options).toPromise()
    }
    //example post
register(){
    let body = JSON.stringify({
    "IDType": "mobile",
    "IDValue":"0000000777",
    "BankCode" : "002",
    "AccountID" : "000-0-111111-8",
    "AccountName" : "eiei7"
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post('http://localhost:8091/v1/v1/callRestApiController/postRegisterPromppay',body,options).toPromise()
    }
}