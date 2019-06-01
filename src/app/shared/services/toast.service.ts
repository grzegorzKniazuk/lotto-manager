import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class ToastService {

    constructor(
        private readonly toastr: ToastrService,
    ) {
    }

    public success(message?: string, title?: string, override?: Partial<IndividualConfig>): void {
        this.toastr.success(message, title, override);
    }

    public error(message?: string, title?: string, override?: Partial<IndividualConfig>): void {
        this.toastr.error(message, title, override);
    }
}
