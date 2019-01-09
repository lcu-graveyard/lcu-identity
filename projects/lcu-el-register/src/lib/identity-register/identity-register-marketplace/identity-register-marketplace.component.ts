import { Component, Injector } from '@angular/core';
import { IControlMarketplace } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeIdentityRegisterDetails, ForgeIdentityRegisterConfig } from '../identity-register.core';

@Component({
	selector: 'forge-identity-register-marketplace',
	templateUrl: './identity-register-marketplace.component.html',
	styleUrls: ['./identity-register-marketplace.component.scss']
})
export class ForgeIdentityRegisterMarketplaceComponent
	extends ForgeGenericControl<ForgeIdentityRegisterDetails, ForgeIdentityRegisterConfig>
	implements IControlMarketplace<ForgeIdentityRegisterDetails, ForgeIdentityRegisterConfig> {
	//  Fields

	//  Properties

	//  Constructors
	constructor(protected injector: Injector) {
		super(injector);
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
}
