import { Component, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { ISolutionControl, ForgeGenericSolution } from '@lcu/solutions';
import { isResultSuccess, BaseResponse, BaseModeledResponse, Loading } from '@lcu/core';
import { ForgeIdentitySolutionManageClaimDialog } from '../dialogs/identity-manage-claim/identity-manage-claim.dialog';
import { ClaimModel, OrganizationIdentityModel, AccessRightModel, AccessConfigModel, ProviderModel } from '@lcu/apps';
import { Pageable, isStatusSuccess } from '@lcu/common';
import { PageUIService, ForgeOrganizationIdentityService } from '@lcu/daf-common';
import { PageEvent, MatPaginator, MatSlideToggleChange } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { GoogleLoginModel, FacebookLoginModel } from '@lcu/identity/lcu.api';



@Component({
    selector: 'forge-solution-identity-manage',
    templateUrl: './identity-manage.component.html',
    styleUrls: ['./identity-manage.component.scss']
})
export class ForgeIdentitySolutionManage extends ForgeGenericSolution
    implements ISolutionControl {
        //  Fields
        protected claimsCheck: string;
        
        //  Properties
        public AccessConfigs: AccessConfigModel[];
    
        public AccessConfigsColumnsToDisplay: string[];
    
        public AccessConfigActiveEdit: string;
    
        public AccessRights: AccessRightModel[];
    
        public AccessRightsColumnsToDisplay: string[];

        public Claims: ClaimModel[];
    
        public ClaimsColumnsToDisplay: string[];

        public CurrentFacebookProvider: ProviderModel;
    
        public Error: string;

        public FacebookLoginFormGroup: FormGroup;

        public FacebookToggle: boolean;
        
        public GoogleLoginFormGroup: FormGroup;

        public GoogleToggle: boolean;
    
        public get HasChanges(): boolean {
            return this.claimsCheck != JSON.stringify(this.Claims);
        }
    
        public Loading: Loading;
    
        public Page: number;
    
        public PageSize: number;
    
        public PageSizeOptions: string[] = ['5', '10', '25', '50', '100'];
    
        @ViewChild(MatPaginator)
        public Paging: MatPaginator;
    
        public ManageState: string;
    
        public TotalRecords: number;
    
        public UserActiveEdit: string;
    
        public Users: OrganizationIdentityModel[];
    
        public UsersColumnsToDisplay: string[];
        
        //  Constructors
        constructor(protected orgIdSvc: ForgeOrganizationIdentityService, protected pgUiSvc: PageUIService, protected formBldr: FormBuilder, protected injector: Injector) {
            super(injector);
    
            this.Loading = new Loading();
    
            this.AccessConfigs = [];
    
            this.AccessConfigsColumnsToDisplay = ['Type', 'AccessRights', 'Actions'];
    
            this.AccessRights = [];
    
            this.AccessRightsColumnsToDisplay = ['Name', 'Lookup', 'Actions'];
    
            this.Claims = [];
    
            this.ClaimsColumnsToDisplay = ['ClaimType', 'Value', 'Actions'];

            this.CurrentFacebookProvider = new ProviderModel();
    
            this.Users = [];
    
            this.UsersColumnsToDisplay = ['Username', 'PhoneNumber', 'Actions'];
        }
    
        //	Life Cycle
        public ngOnInit() {
            super.ngOnInit();
            
            // this.providerConfig.Loading.subscribe(loading => this.Loading.Set(loading));

            // this.providerConfig.Context.subscribe(providerConfig => this.ProviderConfig = providerConfig);

            this.SetManageState('Users');

            this.GetProvider("facebook");

            
            this.FacebookLoginFormGroup = this.formBldr.group({
                fbtoggle: new FormControl(),
                fbappid: new FormControl(''),
                appsecret: new FormControl(''),
            })

            this.GoogleLoginFormGroup = this.formBldr.group({
                googletoggle: new FormControl(),
                googleappid: new FormControl(''),
            })
        }
    
        //	API Methods
        public DeleteClaim(claim: ClaimModel) {
            if (confirm(`Are you sure you want to delete ${claim.ClaimType} from ${this.UserActiveEdit}?`)) {
                this.Loading.Set(true);
    
                this.Error = null;
    
                this.orgIdSvc.DeleteClaim(this.UserActiveEdit, claim.ClaimType).subscribe(
                    (result: BaseResponse) => {
                        if (isResultSuccess(result)) {
                            this.LoadClaims();
                        } else {
                            this.Error = result.Status.Message;
                        }
                    },
                    (err) => {
                        console.log(err);
    
                        this.Error = err;
    
                    },
                    () => {
                        this.Loading.Set(false);
                    });
            }
        }
    
        public GetAccessRight(id: string) {
            return this.AccessRights.find(ar => ar.ID == id);
        }
    
        public GetProvider(providerType: string) {
            this.orgIdSvc.GetProvider(providerType).subscribe(
                (result) => {
                    if (isResultSuccess(result)) {
                        this.CurrentFacebookProvider = result.Model;
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
                    this.Loading.Set(false);
                });
        }

        public LoadAccessConfigs(page: PageEvent) {
            this.Loading.Set(true);
    
            this.Error = null;
    
            var pageIndex = this.Paging ? this.Paging.pageIndex : this.Page;
    
            var pageSize = this.Paging ? this.Paging.pageSize : this.PageSize;
    
            this.orgIdSvc.ListAccessConfigs(pageIndex, pageSize).subscribe(
                (result) => {
                    if (isResultSuccess(result)) {
                        this.AccessConfigs = result.Model.Items;
    
                        this.TotalRecords = result.Model.TotalRecords;
                    } else {
                        this.Error = result.Status.Message;
                    }
                },
                (err) => {
                    console.log(err);
    
                    this.Error = err;
                },
                () => {
                    this.Loading.Set(false);
                });
        }
    
        public LoadAccessRights(page: PageEvent) {
            this.Loading.Set(true);
    
            this.Error = null;
    
            var pageIndex = this.Paging ? this.Paging.pageIndex : this.Page;
    
            var pageSize = this.Paging ? this.Paging.pageSize : this.PageSize;
    
            this.orgIdSvc.ListAccessRights(pageIndex, pageSize).subscribe(
                (result) => {
                    if (isResultSuccess(result)) {
                        this.AccessRights = result.Model.Items;
    
                        this.TotalRecords = result.Model.TotalRecords;
                    } else {
                        this.Error = result.Status.Message;
                    }
                },
                (err) => {
                    console.log(err);
    
                    this.Error = err;
                },
                () => {
                    this.Loading.Set(false);
                });
        }
    
        public LoadClaims() {
            this.Loading.Set(true);
    
            this.Error = null;
    
            this.orgIdSvc.ListClaims(this.UserActiveEdit, 1, 1000).subscribe(
                (result) => {
                    if (isResultSuccess(result)) {
                        this.Claims = result.Model.Items;
    
                        this.claimsCheck = JSON.stringify(this.Claims);
    
                        this.TotalRecords = result.Model.TotalRecords;
                    } else {
                        this.Error = result.Status.Message;
                    }
                },
                (err) => {
                    console.log(err);
    
                    this.Error = err;
                },
                () => {
                    this.Loading.Set(false);
                });
        }
        
        public LoadUsers(page: PageEvent) {
            this.Loading.Set(true);
    
            this.Error = null;
    
            var pageIndex = this.Paging ? this.Paging.pageIndex : this.Page;
    
            var pageSize = this.Paging ? this.Paging.pageSize : this.PageSize;
    
            this.orgIdSvc.ListUsers(pageIndex, pageSize).subscribe(
                (result: BaseModeledResponse<Pageable<OrganizationIdentityModel>>) => {
                    if (isResultSuccess(result)) {
                        this.Users = result.Model.Items;
    
                        this.TotalRecords = result.Model.TotalRecords;
                    } else {
                        this.Error = result.Status.Message;
                    }
                },
                (err) => {
                    console.log(err);
    
                    this.Error = err;
                },
                () => {
                    this.Loading.Set(false);
                });
        }
    
        public ManageClaim(claim: ClaimModel) {
            this.pgUiSvc.Dialog.Open(ForgeIdentitySolutionManageClaimDialog, claim, (result) => {
                if (isResultSuccess(result)) {
                    var isNew = !claim;
    
                    claim = Object.assign(claim || <any>{}, result.Model);
    
                    if (isNew)
                        this.Claims = [...this.Claims, claim];
                }
            });
        }
    
        public ManageUser(username: string) {
            this.UserActiveEdit = username;
    
            if (this.UserActiveEdit) {
                this.SetManageState('Manage');
    
                this.LoadClaims();
            } else {
                this.SetManageState('Users');
            }
        }
    
        public SaveClaims() {
            this.Loading.Set(true);
    
            this.Error = null;
    
            this.orgIdSvc.SaveClaims(this.UserActiveEdit, this.Claims).subscribe(
                (result: BaseResponse) => {
                    if (isResultSuccess(result)) {
                        this.LoadClaims();
                    } else {
                        this.Error = result.Status.Message;
                    }
                },
                (err) => {
                    console.log(err);
    
                    this.Error = err;
                },
                () => {
                    this.Loading.Set(false);
                });
        }
    
        public SetActiveEdit(type: string) {
            if (type == this.AccessConfigActiveEdit)
                this.AccessConfigActiveEdit = null;
            else
                this.AccessConfigActiveEdit = type;
        }
    
        public SetManageState(state: string) {
            this.Page = 1;
    
            this.PageSize = 100;
    
            this.TotalRecords = 0;
    
            this.ManageState = state;
    
            switch (this.ManageState) {
                case 'Users':
                    this.LoadUsers(null);
                    break;
    
                case 'AccessConfigs':
                    this.LoadAccessConfigs(null);
    
                    this.LoadAccessRights(null);
                    break;
    
                case 'AccessRights':
                    this.LoadAccessRights(null);
                    break;
            }
        }
     
        public SaveProvider(provider: string){
            this.Loading.Set(true);

            var config;

            var metadata;

            if (provider === "facebook"){
                config = this.buildFacebookModelFromForm();

                metadata = {
                    AppID: config.AppID,
                    AppSecret: config.AppSecret
                };
            }

            if (provider === "google"){
                config = this.buildGoogleModelFromForm();

                metadata = {
                    AppID: config.AppID,
                    AppSecret: ""
                };
            }
            
            this.orgIdSvc.SaveProvider(config.Name, config.Description, config.Type, metadata).subscribe(
                (result: BaseResponse) => {
                    if (isResultSuccess(result)) {
                        this.pgUiSvc.Notify.Signal("Configuration saved successfully");

                    } else {
                        this.Error = result.Status.Message;
                    }
                },
                (err) => {
                    console.log(err);
    
                    this.Error = err;
                },
                () => {
                    this.Loading.Set(false);
                });

            
        }

        public SaveConfig() {
            // this.Loading.Set(true);
    
            // var facebookConfig = this.buildFacebookModelFromForm();
    
            // this.ProviderConfig.FacebookConfigs["default"] = facebookConfig;
    
            // this.providerConfig.Save(this.ProviderConfig).subscribe(
            //     (status) => {
            //         if (isStatusSuccess(status)) {
            //             this.pgUiSvc.Notify.Signal("Facebook Configuration saved successfully");
            //         } else {
            //             console.log(status);
    
            //             this.pgUiSvc.Notify.Signal(status.Message);
            //         }
            //     },
            //     (err) => {
            //         console.log(err);
    
            //         this.pgUiSvc.Notify.Signal("Unknown error. Please try again, or contact support if the problem continues");
            //     },
            //     () => {
            //         this.Loading.Set(false);
            //     });
        }

        //	Helpers
        protected buildFacebookModelFromForm(): FacebookLoginModel {
            return{
                Name: "Facebook Login Provider",
                SaveToggle: this.FacebookLoginFormGroup.get('fbtoggle').value,
                Description: "Login Provider for Facebook",
                Type: "facebook",
                AppID: this.FacebookLoginFormGroup.get('fbappid').value,
                AppSecret: this.FacebookLoginFormGroup.get('appsecret').value,
            } 
        }

        protected buildGoogleModelFromForm(): GoogleLoginModel {
            return{
                Name: "Google Login Provider",
                SaveToggle: this.GoogleLoginFormGroup.get('googletoggle').value,
                Description: "Login Provider for Google",
                Type: "google",
                AppID: this.GoogleLoginFormGroup.get('appid').value,
            }
        }
}   
