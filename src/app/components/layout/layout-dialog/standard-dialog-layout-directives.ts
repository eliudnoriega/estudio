import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[standard-dialog-actions], [standardDialogActions]',
})
export class StandardDialogLayoutActionsDirective extends CdkPortal {}
