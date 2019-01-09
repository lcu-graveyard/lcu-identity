import { Component, Injector } from '@angular/core';
import { IControlBuilder } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeIdentitySignInDetails, ForgeIdentitySignInConfig } from '../identity-sign-in.core';

@Component({
	selector: 'forge-identity-sign-in-builder',
	templateUrl: './identity-sign-in-builder.component.html',
	styleUrls: ['./identity-sign-in-builder.component.scss']
})
export class ForgeIdentitySignInBuilderComponent
	extends ForgeGenericControl<ForgeIdentitySignInDetails, ForgeIdentitySignInConfig>
	implements IControlBuilder<ForgeIdentitySignInDetails, ForgeIdentitySignInConfig> {
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
