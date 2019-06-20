import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'lm-ekstra-pensja-list',
    templateUrl: './ekstra-pensja-list.component.html',
    styleUrls: [ './ekstra-pensja-list.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EkstraPensjaListComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
