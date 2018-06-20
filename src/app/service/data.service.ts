import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../models/user.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
@Injectable()
export class UserService {
    user = {
        username: "",
        password: "",
        customerID: "",
        name: "",
        address: "",
        phoneNum: "",
        email: "",
        createDTM: "",
        updateDTM: ""
    }
    constructor(private http: Http) {

    }
    extractData(res: Response) {
        let body = res.json();
        console.log(body);       
        return body || {};
    }
    handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
    login(username: string, password: string) {
        let body = JSON.stringify({
            "username": username,
            "password": password
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8091/training/v1/callRestApiController/login', body, options).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
        

        // console.log(this.http.post('http://localhost:8091/training/v1/callRestApiController/login',body,options).toPromise());
        // return resp
    }
    //example post
    register(): Promise<any> {
        let body = JSON.stringify({
            "IDType": "mobile",
            "IDValue": "0000000777",
            "BankCode": "002",
            "AccountID": "000-0-111111-8",
            "AccountName": "eiei7"
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8091/v1/v1/callRestApiController/postRegisterPromppay', body, options).toPromise()
    }
    getAllAccountID() {
        return this.http.get('http://localhost:8091/training/v1/callRestApiController/getAllAccount/'+this.user.customerID).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    registerPromptpay(objectRegister){
        let body = JSON.stringify(objectRegister);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8091/training/v1/callRestApiController/registerPromptpay', body, options).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    deletePromptpay(aIPID){
        //let body = JSON.stringify(objectDelete);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("aIPID"+aIPID)
        return this.http.delete('http://localhost:8091/training/v1/callRestApiController/deletePromtpay/'+aIPID).toPromise()
        .then(this.extractData)
        .catch(this.handleErrorPromise);
    }
    getRawPromptpay(type,value){
        return this.http.get('http://192.168.9.154:8090/interbank/any-id/?type='+type+'&value='+value).toPromise()
        .then(this.extractData)
        .catch(this.handleErrorPromise);
    }
    getTransaction(accountID){
        return this.http.get('http://localhost:8091/training/v1/callRestApiController/getTransaction/'+accountID).toPromise()
        .then(this.extractData)
        .catch(this.handleErrorPromise);
    }
    moneyTranferLocal(objectTranfer): Promise<any>{
        let body = JSON.stringify(objectTranfer);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8091/training/v1/callRestApiController/moneyTransferLocal', body, options).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    moneyTranferPromtpay(objectTranfer): Promise<any>{
        let body = JSON.stringify(objectTranfer);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8091/training/v1/callRestApiController/moneyTransferPromptpay', body, options).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    moneyTranferPromtpayIDTest(objectTranferPromtpay): Promise<any>{
        let body = JSON.stringify({
            "IDType":objectTranferPromtpay.type,
	        "IDValue":objectTranferPromtpay.value,
	        "Amount":objectTranferPromtpay.NetAmount
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8091/training/v1/callRestApiController/moneyTranfer', body, options).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    checkBalanceAmount(accountID){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("chk"+accountID);
        return this.http.get('http://localhost:8091/training/v1/callRestApiController/checkBalanceAmount/'+accountID).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    checkExistAccount(accountID){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("chk2"+accountID);
        return this.http.get('http://localhost:8091/training/v1/callRestApiController/checkExistAccount/'+accountID).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
}