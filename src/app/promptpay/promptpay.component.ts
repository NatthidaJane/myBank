import { Component } from '@angular/core';
import {  NavbarService} from "../service/navbar.service";
import { UserService } from "../service/data.service"
import { HttpErrorResponse } from '@angular/common/http';
@Component({
    selector: 'promptpay',
    templateUrl: 'promptpay.component.html',
    styleUrls: ['promptpay.component.scss']
})
export class PromptpayComponent {
    accountList = [{
        accountID: "",
        customerID: 0,
        bankCode: "",
        accountType: "",
        statusCode: "",
        balanceAmount: 0,
        createDTM: "",
        updateDTM: "",
        accountName:""
    }]
    registerSet={
        IDType : 'mobile',
        IDValue : '',
        BankCode : '020',
        AccountID : this.accountList[0].accountID,
        AccountName : ''
    }
    deleteSet={
        IDType : 'mobile',
        IDValue : ''
    }
    RawPromptpay = {
        Status: "",
        BankCode: "",
        AccountID: "",
        AccountName: "",
        IDValue: "",
        IDType: "",
        AIPID: "",
        RegisterDTM: ""
    }
    checkRegisterFail=false
    checkRegisterSuccess=false
    checkAccountPromptpayNotExist=false
    checkDeleteSuccess=false
    checkDeleteFail=false
    constructor(private nav:NavbarService,private service:UserService){
        this.nav.show();
        this.service.getAllAccountID()
            .then((resp) => {
                let data = resp
                this.accountList = resp;
                console.log(resp)
            })
    }
    registerPromptpay(){
        this.checkRegisterFail=false
        this.checkRegisterSuccess=false
        console.log("register");
        console.log(this.accountList[0])
        console.log(this.registerSet);
        this.registerSet.AccountName = this.accountList[0].accountName
        this.service.registerPromptpay(this.registerSet)
        .then((resp) => {
            
            console.log(resp.code);
            if(resp.code==0){ this.checkRegisterFail=true; }
            else if(resp.code==1){ this.checkRegisterSuccess=true; }
            else {this.checkRegisterFail=true;}
        }).catch ((err: HttpErrorResponse) => {
            this.checkRegisterFail=true;
            console.log(err);
            console.log(err.status);
        })
    }
    deletePromptpay() {
        this.checkAccountPromptpayNotExist=false
        this.checkDeleteSuccess=false
        this.checkDeleteFail=false
        this.service.getRawPromptpay(this.deleteSet.IDType,this.deleteSet.IDValue)
            .then((resp) => {
                this.RawPromptpay=resp;
                let aIPID=this.RawPromptpay.AIPID;
                console.log(aIPID);
                this.service.deletePromptpay(aIPID)
                    .then((resp)=>{
                        this.checkDeleteSuccess=true
                    })
                    .catch((err: HttpErrorResponse) => {
                        console.log(err);
                        console.log(err.status);
                        this.checkDeleteFail=true
                    })
            }).catch((err: HttpErrorResponse) => {
                console.log(err);
                console.log(err.status);
                this.checkAccountPromptpayNotExist=true
            })
    }
}
