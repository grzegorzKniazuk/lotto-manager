import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { MaterialIconColor, MaterialIconSize } from 'src/app/shared/enums';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'lm-icon',
    templateUrl: './icon.component.html',
    styleUrls: [ './icon.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {

    @Input() public iconSize: MaterialIconSize | string = MaterialIconSize.MD_24;
    @Input() public iconColor: MaterialIconColor | string = MaterialIconColor.MD_DARK;

    constructor(
        private readonly domSanitizer: DomSanitizer,
    ) {
    }

    public get cssClasses(): string {
        return `material-icons ${this.iconSize} ${this.iconColor}`;
    }

    @HostBinding('style')
    public get style(): SafeStyle {
        switch (this.iconSize) {
            case MaterialIconSize.MD_18: {
                return this.domSanitizer.bypassSecurityTrustStyle(`height: 18px; width: 18px;`);
            }
            case MaterialIconSize.MD_24: {
                return this.domSanitizer.bypassSecurityTrustStyle(`height: 24px; width: 24px;`);
            }
            case MaterialIconSize.MD_36: {
                return this.domSanitizer.bypassSecurityTrustStyle(`height: 36px; width: 36px;`);
            }
            case MaterialIconSize.MD_48: {
                return this.domSanitizer.bypassSecurityTrustStyle(`height: 48px; width: 48px;`);
            }
        }

    }
}
