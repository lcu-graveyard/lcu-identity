import { Component, Injector } from '@angular/core';
import { IControlMarketplace } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeIdentityRecoverPasswordDetails, ForgeIdentityRecoverPasswordConfig } from '../identity-recover-password.core';

@Component({
	selector: 'forge-identity-recover-password-marketplace',
	templateUrl: './identity-recover-password-marketplace.component.html',
	styleUrls: ['./identity-recover-password-marketplace.component.scss']
})
export class ForgeIdentityRecoverPasswordMarketplaceComponent
	extends ForgeGenericControl<ForgeIdentityRecoverPasswordDetails, ForgeIdentityRecoverPasswordConfig>
	implements IControlMarketplace<ForgeIdentityRecoverPasswordDetails, ForgeIdentityRecoverPasswordConfig> {
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
