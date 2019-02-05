import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Status } from '@lcu/common';
import { ForgeJSONSchema, ProviderModel } from '@lcu/apps';
import { RouterHelpersService } from '@lcu/routing';
import { BaseResponse, isResultSuccess } from '@lcu/core';
import { IdentityService } from '../../../identity.service';
import { SignInModel } from '../../../sign-in-model';
import { AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { ForgeOrganizationIdentityService } from '@lcu/daf-common';

@Component({
	selector: 'f-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class ForgeSignInComponent implements OnInit {
	//  Fields

	//  Properties
	public Error: string;

    public Loading: boolean;

	public RedirectTo: string;
	
	@Input('display-providers')
	public DisplayProviders: boolean;

	@Output('signed-in')
    public SignedIn: EventEmitter<{ Status: Status, RedirectTo: string }> = new EventEmitter<{ Status: Status, RedirectTo: string }>();

	public SignInFormGroup: FormGroup;

	@Output('error')
    public SignInError: EventEmitter<Status> = new EventEmitter<Status>();

    @Input('sign-in-schema')
	public SignInSchema: ForgeJSONSchema;
	
	public CurrentFacebookProvider: ProviderModel;

	public CurrentGoogleProvider: ProviderModel;

	//  Constructors
	constructor(protected idSvc: IdentityService, protected route: ActivatedRoute, protected formBldr: FormBuilder,
		protected routerHelpers: RouterHelpersService, protected socialAuthSvc: SocialAuthService, protected orgIdSvc: ForgeOrganizationIdentityService) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.SignInFormGroup = this.formBldr.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			remember: ['']
		});

		this.orgIdSvc.GetProvider("facebook").subscribe(
			(result) => {
				if(isResultSuccess(result)){
					if(result.Model != null){
						this.CurrentFacebookProvider = result.Model;
					}
				}
				else{
					this.Error = result.Status.Message;

				}
			},
			(err) => {
				console.log(err);

				this.Error = err;
			},
			() => {
				this.Loading = false;
			}
			);

			this.orgIdSvc.GetProvider("google").subscribe(
				(result) => {
					if(isResultSuccess(result)){
						if(result.Model != null){
							this.CurrentGoogleProvider = result.Model;
						}
					}
					else{
						this.Error = result.Status.Message;
	
					}
				},
				(err) => {
					console.log(err);
	
					this.Error = err;
				},
				() => {
					this.Loading = false;
				}
				);

		this.routerHelpers.RunOnQueryParam('redirectTo', (params: any) => {
			this.RedirectTo = decodeURIComponent(params['redirectTo']);
		});

		this.routerHelpers.RunOnQueryParam('username', (params: any) => {
			this.SignInFormGroup.get('username').setValue(decodeURIComponent(params['username']));
		});
	}

	//	API Methods
	public HandleSignIn() {
		this.Loading = true;

		this.Error = null;

		var signIn = this.buildSignInModelFromForm();

		this.idSvc.SignIn(signIn)
			.subscribe((result: BaseResponse) => {
				if (isResultSuccess(result)) {
                    this.SignedIn.emit({ Status: result.Status, RedirectTo: this.RedirectTo });
				} else {
					console.log(result);

					this.Error = result.Status.Message;

					this.Loading = false;

					this.SignInError.emit(result.Status);
				}
			},
			(error: any) => {
				this.handleUnkownError(error);
			});
	}

	public HandleSocialSignIn(providerType: string){
		if (providerType == "facebook")
			this.socialAuthSvc.signIn(this.CurrentFacebookProvider.AppID).then (
				(userData) => {
					
				}
			);
		if (providerType == "google")
			this.socialAuthSvc.signIn(this.CurrentGoogleProvider.AppID);
	}

	//	Helpers
	protected buildSignInModelFromForm(): SignInModel {
		return {
			Username: this.SignInFormGroup.get('username').value,
			Password: this.SignInFormGroup.get('password').value,
			RememberMe: !!this.SignInFormGroup.get('remember').value
		};
	}

	protected handleUnkownError(error: any) {
		console.log(error);

		var err = <any>{ HTTPError: error };

		var errStatus = <Status>err;

		errStatus.Code = 1;

		errStatus.Message = 'There was an unknown issue.  Please try again and contact support if the problem continues.';

		this.SignInError.emit(<Status>errStatus);

		this.Error = errStatus.Message;

		this.Loading = false;
	}
}
