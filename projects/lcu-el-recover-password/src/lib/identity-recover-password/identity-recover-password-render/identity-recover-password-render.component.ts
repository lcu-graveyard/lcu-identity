import { Component, Injector } from '@angular/core';
import { IControlRender } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { Status } from '@lcu/common';
import { JSONSchemaMap } from '@lcu/apps';
import { ForgeIdentityRecoverPasswordDetails, ForgeIdentityRecoverPasswordConfig } from '../identity-recover-password.core';

@Component({
	selector: 'forge-identity-recover-password-render',
	templateUrl: './identity-recover-password-render.component.html',
	styleUrls: ['./identity-recover-password-render.component.scss']
})
export class ForgeIdentityRecoverPasswordRenderComponent
	extends ForgeGenericControl<ForgeIdentityRecoverPasswordDetails, ForgeIdentityRecoverPasswordConfig>
	implements IControlRender<ForgeIdentityRecoverPasswordDetails, ForgeIdentityRecoverPasswordConfig> {
		//  Fields
	
		//  Properties
		public SchemaMap: JSONSchemaMap;
	
		//  Constructors
		constructor(protected injector: Injector) {
			super(injector);
		}
	
		//	Life Cycle
	
		//	API Methods
		public RecoveredPassword() {
			location.href = this.Details.RecoverPasswordRedirect;
		}
	
		public RecoverPasswordError(status: Status) {
			this.pgUiSvc.Notify.Signal(status.Message);
		}
}
