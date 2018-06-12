// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { CommonModule, } from '@angular/common';
@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        MainComponent,
    ],
    exports: [
        MainComponent,
    ]
})
export class MainModule {

}
