import { Component } from '@angular/core';
import {  NavbarService} from "../service/navbar.service";

@Component({
    selector: 'promptpay',
    templateUrl: 'promptpay.component.html',
    styleUrls: ['promptpay.component.scss']
})
export class PromptpayComponent {
    accountList = ["1234567890","0987654321"]
    registerSet={
        IDType : 'mobile',
        IDValue : '',
        BankCode : '020',
        AccountID : this.accountList[0],
        AccountName : "Nat"
    }

    deleteSet={
        IDType : 'mobile',
        IDValue : ''
    }
    constructor(private nav:NavbarService){
        this.nav.show();
    }
}
