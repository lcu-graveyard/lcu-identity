import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { ForgeIdentityRegisterBuilderComponent } from './identity-register-builder/identity-register-builder.component';
import { ForgeIdentityRegisterMarketplaceComponent } from './identity-register-marketplace/identity-register-marketplace.component';
import { ForgeIdentityRegisterRenderComponent } from './identity-register-render/identity-register-render.component';
import { ForgeRegisterModule } from '@lcu/daf-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';
import { BaseDisplayModule } from '@lcu/elements';

export class ForgeIdentityRegisterDisplayModule extends BaseDisplayModule {
	public Builder() {
		return ForgeIdentityRegisterBuilderComponent;
	}

	public Marketplace() {
		return ForgeIdentityRegisterMarketplaceComponent;
	}

	public Render() {
		return ForgeIdentityRegisterRenderComponent;
	}
}

var comps = [
	ForgeIdentityRegisterBuilderComponent,
	ForgeIdentityRegisterMarketplaceComponent,
	ForgeIdentityRegisterRenderComponent,
];

@NgModule({
	imports: [
		FathymSharedModule,
		ForgeRegisterModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatStepperModule,
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
export class ForgeIdentityRegisterModule { }
