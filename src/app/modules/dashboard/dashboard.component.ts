import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/shared/services/score.service';

@Component({
    selector: 'lm-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent implements OnInit {

    constructor(
        private readonly scoreService: ScoreService,
    ) {
    }

    ngOnInit() {
        this.scoreService.loadScores();
    }
}
