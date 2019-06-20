import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'lm-ekstra-premia-list',
    templateUrl: './ekstra-premia-list.component.html',
    styleUrls: [ './ekstra-premia-list.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EkstraPremiaListComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
