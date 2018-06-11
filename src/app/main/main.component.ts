import { Component } from '@angular/core';
import { NavbarService } from '../service/navbar.service'

@Component({
    selector: 'main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent {
    accountName = "Natthida"
    constructor(private nav: NavbarService) {
        this.nav.show()
    }
}
