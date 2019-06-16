import { Component } from '@angular/core';

@Component({
    selector: 'lm-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent {

    public isMenuClosed = false;

    public toggleMenu(): void {
        this.isMenuClosed = !this.isMenuClosed;
    }
}
