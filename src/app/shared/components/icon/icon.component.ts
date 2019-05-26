import { Component, Input } from '@angular/core';
import { MaterialIconColor, MaterialIconSize } from 'src/app/shared/enums';

@Component({
    selector: 'lm-icon',
    templateUrl: './icon.component.html',
    styleUrls: [ './icon.component.scss' ],
})
export class IconComponent {

    @Input() public size: MaterialIconSize = MaterialIconSize.MD_24;
    @Input() public color: MaterialIconColor = MaterialIconColor.MD_DARK;

    public get cssRules(): string {
        return `material-icons ${this.size} ${this.color}`;
    }
}
