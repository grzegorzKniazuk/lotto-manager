import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { LOGIN } from 'src/app/modules/auth/store/actions/auth.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private readonly endpoint = 'auth';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly toastService: ToastService,
        private readonly router: Router,
        private readonly store: Store<AppState>,
    ) {
    }

    public register(user: Partial<User>): void {
        this.httpClient.post(`${API_URL}/${this.endpoint}/register`, user)
            .subscribe(() => {
                this.router.navigateByUrl('login').then(() => {
                    this.toastService.success('Konto użytkownika zostało utworzone');
                });
            });
    }

    public login({ username, password }: Partial<User>): void {
        this.httpClient.post(`${API_URL}/${this.endpoint}/login`, { username, password })
            .subscribe(({ username, token }: { username: string, token: string }) => {
                this.store.dispatch(new LOGIN({ username, token }));
                this.router.navigateByUrl('dashboard');
            });
    }

    public authorize(token: string): Observable<boolean> {
        return this.httpClient.post(`${API_URL}/${this.endpoint}/authorize`, { token }).pipe(
            map((isLoggedIn: boolean) => isLoggedIn),
        );
    }
}
