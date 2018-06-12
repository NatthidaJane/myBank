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
        balanceAmount:'5000.0'
        }
    ]
    constructor(private nav:NavbarService){
        this.nav.show();
    }
}
