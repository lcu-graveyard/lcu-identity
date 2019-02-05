import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout'

import { FathymSharedModule } from '@lcu/hosting';

import { ForgeSignInComponent } from './sign-in.component';

import { SocialLoginModule } from 'angularx-social-login'


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
	exports: [
		ForgeSignInComponent
	]
})
export class ForgeSignInModule {
}
