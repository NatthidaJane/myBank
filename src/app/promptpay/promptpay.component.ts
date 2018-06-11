import { Component } from '@angular/core';
import {  NavbarService} from "../service/navbar.service";

@Component({
    moduleId: module.id,
    selector: 'promptpay',
    templateUrl: 'promptpay.component.html',
    styleUrls: ['promptpay.component.scss']
})
export class PromptpayComponent {
    constructor(private nav:NavbarService){
        this.nav.show();
    }
}
