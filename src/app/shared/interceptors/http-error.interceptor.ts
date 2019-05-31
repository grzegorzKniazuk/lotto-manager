import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor() {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.showErrorToast(error.error.code);
                return throwError(error);
            }),
        );
    }

    private isClientSideError(error: HttpErrorResponse): boolean {
        return error.error instanceof ErrorEvent;
    }

    private showErrorToast(code: string): void {

    }
}
