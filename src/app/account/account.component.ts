import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../service/navbar.service'
import { UserService } from '../service/data.service';

@Component({
    moduleId: module.id,
    selector: 'account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.scss']
})
export class AccountComponent implements OnInit {
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
    transactions=[]
    constructor(private nav:NavbarService,private userlog:UserService){
        this.nav.show();
    }
    ngOnInit() {
       this.userlog.getAllAccountID()
       .then((resp)=>{
        let data = resp
        this.accountList=resp;
        this.accountList.forEach((item,index)=>{
            this.getTransactionByID(this.accountList[index].accountID,index)
        })
        console.log(resp)
       })
    }
    getTransactionByID(accountID,id){
        this.userlog.getTransaction(accountID)
            .then(resp=>{
                this.transactions[id]=resp
                console.log(this.transactions[id]);
                
            })
    }
}
