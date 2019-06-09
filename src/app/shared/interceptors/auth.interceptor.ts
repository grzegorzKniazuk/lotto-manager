import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectAuthToken } from 'src/app/modules/auth/store/selectors/auth.selectors';
import { first, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private store: Store<AppState>,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.pipe(
            select(selectAuthToken),
            first(),
            switchMap((token: string) => {
                if (token) {
                    const cloned = request.clone({
                        setHeaders: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    return next.handle(cloned);
                } else {
                    return next.handle(request);
                }
            }),
        );
    }
}
