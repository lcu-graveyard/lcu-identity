import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/hosting';
import { ForgeIdentitySignInBuilderComponent } from './identity-sign-in-builder/identity-sign-in-builder.component';
import { ForgeIdentitySignInMarketplaceComponent } from './identity-sign-in-marketplace/identity-sign-in-marketplace.component';
import { ForgeIdentitySignInRenderComponent } from './identity-sign-in-render/identity-sign-in-render.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgeSignInModule } from '@lcu/identity';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSlideToggleModule } from '@angular/material';
import { BaseDisplayModule } from '@lcu/elements';

export class ForgeIdentitySignInDisplayModule extends BaseDisplayModule {
	public Builder() {
		return ForgeIdentitySignInBuilderComponent;
	}

	public Marketplace() {
		return ForgeIdentitySignInMarketplaceComponent;
	}

	public Render() {
		return ForgeIdentitySignInRenderComponent;
	}
}

var comps = [
	ForgeIdentitySignInBuilderComponent,
	ForgeIdentitySignInMarketplaceComponent,
	ForgeIdentitySignInRenderComponent,
];

@NgModule({
	imports: [
		FathymSharedModule,
		ForgeSignInModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatSlideToggleModule,
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
export class ForgeIdentitySignInModule { }
