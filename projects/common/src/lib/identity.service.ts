import { Injectable, Injector } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '@lcu/core';
import { DAFService } from '@lcu/api';

import { RegisterModel } from './register-model';
import { SignInModel } from './sign-in-model';
import { IdentityOptions } from './identity-options';
import { ConfirmPasswordRecoveryModel } from './confirm-password-recovery-model';
import { RecoverPasswordModel } from './recover-password-model';
import { ProviderModel } from '@lcu/apps';

@Injectable({
	providedIn: 'root'
})
export class IdentityService extends DAFService {
	//  Constructors
	constructor(protected injector: Injector, protected options: IdentityOptions) {
		super(injector);
	}

	//  API Methods

    public ConfirmPasswordRecovery(model: ConfirmPasswordRecoveryModel): Observable<BaseResponse> {
        return this.post(model, this.options.ConfirmPasswordRecoveryURL);
    }

	public IsAuthenticated(): Observable<BaseResponse> {
		return this.http.get(this.options.IsAuthenticatedURL).pipe(
			this.map<BaseResponse>(),
			this.catchError()
		);
    }

    public IsRegistered(model: RegisterModel): Observable<BaseResponse> {
        return this.http.get(`${this.options.IsRegisteredURL}?${this.options.IsRegisteredUserQueryParamName}=${model.Username}&${this.options.IsRegisteredPasswordQueryParamName}=${model.Password}`).pipe(
            this.map<BaseResponse>(),
            this.catchError()
        );
    }

    public RecoverPassword(model: RecoverPasswordModel): Observable<BaseResponse> {
        return this.post(model, this.options.RecoverPasswordURL);
    }

	public Register(model: RegisterModel): Observable<BaseResponse> {
        return this.post(model, this.options.RegisterURL);
	}

    public SignIn(model: SignInModel): Observable<BaseResponse> {
        return this.post(model, this.options.SignInURL);
	}

    public FbSignIn(model: ProviderModel): Observable<BaseResponse> {
        return this.post(model, this.options.SignInURL);
    }
    
    public SignOut(): Observable<BaseResponse> {
        return this.post({}, this.options.SignOutURL);
	}
}
