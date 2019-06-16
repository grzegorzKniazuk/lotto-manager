import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'lm-dashboard-side-menu',
    templateUrl: './dashboard-side-menu.component.html',
    styleUrls: [ './dashboard-side-menu.component.scss' ],
})
export class DashboardSideMenuComponent {
    @Output() public onMenuIconClick: EventEmitter<void> = new EventEmitter();
    public isMenuClosed = false;

    public hamburgerIconClick(): void {
        this.isMenuClosed = !this.isMenuClosed;
        this.onMenuIconClick.emit();
    }
}
