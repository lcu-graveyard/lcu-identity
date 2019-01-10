import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { BaseDisplayModule } from '@lcu/elements';
import { ForgeIdentityRecoverPasswordBuilderComponent } from './identity-recover-password-builder/identity-recover-password-builder.component';
import { ForgeIdentityRecoverPasswordMarketplaceComponent } from './identity-recover-password-marketplace/identity-recover-password-marketplace.component';
import { ForgeIdentityRecoverPasswordRenderComponent } from './identity-recover-password-render/identity-recover-password-render.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { ForgeRecoverPasswordModule } from '@lcu/identity';

export class ForgeIdentityRecoverPasswordDisplayModule extends BaseDisplayModule {
	public Builder() {
		return ForgeIdentityRecoverPasswordBuilderComponent;
	}

	public Marketplace() {
		return ForgeIdentityRecoverPasswordMarketplaceComponent;
	}

	public Render() {
		return ForgeIdentityRecoverPasswordRenderComponent;
	}
}

var comps = [
	ForgeIdentityRecoverPasswordBuilderComponent,
	ForgeIdentityRecoverPasswordMarketplaceComponent,
	ForgeIdentityRecoverPasswordRenderComponent,
];

@NgModule({
	imports: [
		FathymSharedModule,
		ForgeRecoverPasswordModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
	],
	declarations: [
		...comps,
	],
	exports: [
		...comps,
	],
	entryComponents: [
		...comps,
	]
})
export class ForgeIdentityRecoverPasswordModule { }
