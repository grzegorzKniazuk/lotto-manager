import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'lm-ekstra-premia-list',
    templateUrl: './ekstra-premia-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EkstraPremiaListComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
