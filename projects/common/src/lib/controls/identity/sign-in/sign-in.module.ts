import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout'

import { FathymSharedModule } from '@lcu/hosting';

import { ForgeSignInComponent } from './sign-in.component';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login'


// let config = new AuthServiceConfig([
// 	{
// 		id: FacebookLoginProvider.PROVIDER_ID,
// 		provider: new FacebookLoginProvider("271274289570856"),
// 	},
// 	{
// 		id: GoogleLoginProvider.PROVIDER_ID,
// 		provider: new GoogleLoginProvider("271274289570856"),
// 	},
// ]);

// export function provideConfig() {
// 	return config;
//   }

@NgModule({
	imports: [
		FathymSharedModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		SocialLoginModule,
	],
	declarations: [
		ForgeSignInComponent
	],
	// providers: [
	// 	{
	// 		provide: AuthServiceConfig,
	// 		useFactory: provideConfig,
	// 	}
	// ],
	exports: [
		ForgeSignInComponent
	]
})
export class ForgeSignInModule {
}
