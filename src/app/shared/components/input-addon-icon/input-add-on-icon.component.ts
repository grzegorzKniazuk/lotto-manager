import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputAddOnTheme } from 'src/app/shared/enums';

@Component({
    selector: 'lm-input-add-on-icon',
    templateUrl: './input-add-on-icon.component.html',
    styleUrls: [ './input-add-on-icon.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAddOnIconComponent {
    @Input() public theme: InputAddOnTheme | string;
}
