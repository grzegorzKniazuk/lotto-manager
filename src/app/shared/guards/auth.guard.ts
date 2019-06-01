import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AuthService } from 'src/app/shared/services';
import { selectAuthToken } from 'src/app/modules/auth/store/selectors/auth.selectors';
import { first, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store<AppState>,
        private authService: AuthService,
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.pipe(
            select(selectAuthToken),
            first(),
            mergeMap((token: string) => this.authService.authorize(token)),
        );
    }

}
