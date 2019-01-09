import { Component, Injector } from '@angular/core';
import { IControlRender } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeIdentitySignInDetails, ForgeIdentitySignInConfig } from '../identity-sign-in.core';
import { Status } from '@lcu/common';
import { JSONSchemaMap } from '@lcu/apps';

@Component({
	selector: 'forge-identity-sign-in-render',
	templateUrl: './identity-sign-in-render.component.html',
	styleUrls: ['./identity-sign-in-render.component.scss']
})
export class ForgeIdentitySignInRenderComponent
	extends ForgeGenericControl<ForgeIdentitySignInDetails, ForgeIdentitySignInConfig>
	implements IControlRender<ForgeIdentitySignInDetails, ForgeIdentitySignInConfig> {
		//  Fields
	
		//  Properties
		public SchemaMap: JSONSchemaMap;
	
		//  Constructors
		constructor(protected injector: Injector) {
			super(injector);
		}
	
		//	Life Cycle
	
		//	API Methods
		public SignedIn() {
			location.href = this.Details.SignInRedirect;
		}
	
		public SignInError(status: Status) {
			this.pgUiSvc.Notify.Signal(status.Message);
		}
}
