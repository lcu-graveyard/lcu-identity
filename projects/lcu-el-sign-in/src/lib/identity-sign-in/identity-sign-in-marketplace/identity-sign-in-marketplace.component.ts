import { Component, Injector } from '@angular/core';
import { IControlMarketplace } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeIdentitySignInDetails, ForgeIdentitySignInConfig } from '../identity-sign-in.core';

@Component({
	selector: 'forge-identity-sign-in-marketplace',
	templateUrl: './identity-sign-in-marketplace.component.html',
	styleUrls: ['./identity-sign-in-marketplace.component.scss']
})
export class ForgeIdentitySignInMarketplaceComponent
	extends ForgeGenericControl<ForgeIdentitySignInDetails, ForgeIdentitySignInConfig>
	implements IControlMarketplace<ForgeIdentitySignInDetails, ForgeIdentitySignInConfig> {
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
