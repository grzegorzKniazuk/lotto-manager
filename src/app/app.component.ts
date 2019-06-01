import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';

@Component({
    selector: 'lm-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    public ngOnInit(): void {
        this.httpClient.get(`${API_URL}/scores`).subscribe(v => {
            console.log(v);
        })
    }
}
