import { Component, Injector } from '@angular/core';
import { IControlBuilder } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeIdentityRecoverPasswordDetails, ForgeIdentityRecoverPasswordConfig } from '../identity-recover-password.core';

@Component({
	selector: 'forge-identity-recover-password-builder',
	templateUrl: './identity-recover-password-builder.component.html',
	styleUrls: ['./identity-recover-password-builder.component.scss']
})
export class ForgeIdentityRecoverPasswordBuilderComponent
	extends ForgeGenericControl<ForgeIdentityRecoverPasswordDetails, ForgeIdentityRecoverPasswordConfig>
	implements IControlBuilder<ForgeIdentityRecoverPasswordDetails, ForgeIdentityRecoverPasswordConfig> {
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
