import { Component, Injector } from '@angular/core';
import { IControlRender } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeIdentityRegisterDetails, ForgeIdentityRegisterConfig } from '../identity-register.core';
import { Loading, isResultSuccess } from '@lcu/core';
import { JSONSchemaMap, ForgeJSONSchema } from '@lcu/apps';
import { ForgeJSONSchemaService } from '@lcu/daf-common';
import { Status } from '@lcu/common';

@Component({
	selector: 'forge-identity-register-render',
	templateUrl: './identity-register-render.component.html',
	styleUrls: ['./identity-register-render.component.scss']
})
export class ForgeIdentityRegisterRenderComponent
	extends ForgeGenericControl<ForgeIdentityRegisterDetails, ForgeIdentityRegisterConfig>
	implements IControlRender<ForgeIdentityRegisterDetails, ForgeIdentityRegisterConfig> {
		//  Fields
	
		//  Properties
		public Loading: Loading;
	
		public SchemaMap: JSONSchemaMap;
	
		//  Constructors
		constructor(protected schemaSvc: ForgeJSONSchemaService, protected injector: Injector) {
			super(injector);
		}
	
		//	Life Cycle
		public ngOnInit() {
			super.ngOnInit();
	
			this.loadJsonSchemaMap();
		}
	
		//	API Methods
		public Registered() {
			location.href = this.Details.RegisterRedirect;
		}
	
		public RegisterError(status: Status) {
			this.pgUiSvc.Notify.Signal(status.Message);
		}
	
		//	Helpers
		protected loadJsonSchemaMap() {
			if (this.Details.ProfileSchemaID) {
				this.Loading.Set(true);
	
				this.schemaSvc.Get(this.Details.ProfileSchemaID)
					.subscribe(
						(schemaResult) => {
							if (isResultSuccess(schemaResult)) {
								this.SchemaMap = schemaResult.Model;
							} else if (schemaResult.Status.Code == 2) {
								this.SchemaMap = <JSONSchemaMap>{
									Schema: <ForgeJSONSchema>{}
								};
							} else {
								console.log(schemaResult);
							}
						},
						(error: any) => {
							console.log(error);
						},
						() => {
							this.Loading.Set(false);
						});
			}
		}
}
