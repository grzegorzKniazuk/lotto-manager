import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { API_URL } from 'src/app/shared/constants';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private httpClient: HttpClient,
        private store: Store<AppState>,
    ) {
    }

    public createUser(user: Partial<User>): void {
        this.httpClient.post(`${API_URL}/users`, { user }).subscribe((response) => {
            console.log(response);
        });
    }
}
