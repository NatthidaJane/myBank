import { Component } from '@angular/core';

@Component({
    selector: 'money-tranfer',
    templateUrl: 'money-tranfer.component.html',
    styleUrls: ['money-tranfer.component.scss']
})
export class MoneyTranferComponent {
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
}
