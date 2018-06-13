import { Component } from '@angular/core';
import {NavbarService} from '../service/navbar.service'

@Component({
    moduleId: module.id,
    selector: 'account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.scss']
})
export class AccountComponent {
    accountUserList=[
        {
        number:'1234567890',
        accountType:'Savings',
        balanceAmount:'5000.00'
        }
    ]
    transactions=[
        {
            createDTM:'2018-06-08 04:34:38',
            txnType:'S',
            netAmount:'100.00'
        },
        {
            createDTM:'2018-06-08 04:34:38',
            txnType:'R',
            netAmount:'100.00'
        },
    ]
    constructor(private nav:NavbarService){
        this.nav.show();
    }
}
