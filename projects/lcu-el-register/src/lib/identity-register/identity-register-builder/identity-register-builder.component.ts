import { Component, Injector } from '@angular/core';
import { IControlBuilder } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeIdentityRegisterDetails, ForgeIdentityRegisterConfig } from '../identity-register.core';
import { Observable } from 'rxjs';
import { Loading, isResultSuccess } from '@lcu/core';
import { JSONSchemaMap, ForgeJSONSchema } from '@lcu/apps';
import { isStatusSuccess, Status } from '@lcu/common';
import { ForgeJSONSchemaService } from '@lcu/daf-common';

@Component({
	selector: 'forge-identity-register-builder',
	templateUrl: './identity-register-builder.component.html',
	styleUrls: ['./identity-register-builder.component.scss']
})
export class ForgeIdentityRegisterBuilderComponent
	extends ForgeGenericControl<ForgeIdentityRegisterDetails, ForgeIdentityRegisterConfig>
	implements IControlBuilder<ForgeIdentityRegisterDetails, ForgeIdentityRegisterConfig> {
		//  Fields
		protected schemaCheck: string;
	
		//  Properties
		public get HasSchemaChanges(): boolean {
			return this.schemaCheck != JSON.stringify(this.SchemaMap);
		}
	
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
		public UpdateSchema() {
			this.saveJsonSchemaMap().subscribe(
				(status) => {
					if (isStatusSuccess(status)) {
						this.pgUiSvc.Notify.Signal('JSON Schema has been Updated');
	
						this.schemaCheck = JSON.stringify(this.SchemaMap);
					}
				});
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
	
							this.schemaCheck = JSON.stringify(this.SchemaMap);
						},
						(error: any) => {
							console.log(error);
						},
						() => {
							this.Loading.Set(false);
						});
			} else {
				this.SchemaMap = <JSONSchemaMap>{
					Schema: <ForgeJSONSchema>{}
				};
			}
		}
	
		protected saveJsonSchemaMap(): Observable<Status> {
			return new Observable(obs => {
				this.Loading.Set(true);
	
				this.schemaSvc.Save(this.SchemaMap)
					.subscribe(
						(schemaResult) => {
							if (isResultSuccess(schemaResult)) {
								this.SchemaMap = schemaResult.Model;
	
								this.Details.ProfileSchemaID = schemaResult.Model.ID
	
								obs.next(<Status>{ Code: 0, Message: 'Success' });
	
								obs.complete();
							} else {
								console.log(schemaResult);
	
								obs.next(schemaResult.Status);
	
								obs.complete();
							}
						},
						(error: any) => {
							console.log(error);
	
							obs.next(<Status>{ Code: 1, Message: 'General Error' });
	
							obs.complete();
						},
						() => {
							this.Loading.Set(false);
						});
			});
		}
}
