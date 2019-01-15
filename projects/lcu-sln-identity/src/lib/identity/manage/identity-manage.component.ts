import { Component, Injector, ViewChild } from '@angular/core';
import { ISolutionControl, ForgeGenericSolution } from '@lcu/solutions';
import { isResultSuccess, BaseResponse, BaseModeledResponse, Loading } from '@lcu/core';
import { ForgeIdentitySolutionManageClaimDialog } from '../dialogs/identity-manage-claim/identity-manage-claim.dialog';
import { ClaimModel, OrganizationIdentityModel, AccessRightModel, AccessConfigModel } from '@lcu/apps';
import { Pageable } from '@lcu/common';
import { PageUIService, ForgeOrganizationIdentityService } from '@lcu/daf-common';
import { PageEvent, MatPaginator } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FacebookLoginModel, GoogleLoginModel } from '@lcu/identity';


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
        constructor(protected orgIdSvc: ForgeOrganizationIdentityService, protected pgUiSvc: PageUIService, protected formBldr: FormBuilder,
            protected injector: Injector) {
            super(injector);
    
            this.Loading = new Loading();
    
            this.AccessConfigs = [];
    
            this.AccessConfigsColumnsToDisplay = ['Type', 'AccessRights', 'Actions'];
    
            this.AccessRights = [];
    
            this.AccessRightsColumnsToDisplay = ['Name', 'Lookup', 'Actions'];
    
            this.Claims = [];
    
            this.ClaimsColumnsToDisplay = ['ClaimType', 'Value', 'Actions'];
    
            this.Users = [];
    
            this.UsersColumnsToDisplay = ['Username', 'PhoneNumber', 'Actions'];
        }
    
        //	Life Cycle
        public ngOnInit() {
            super.ngOnInit();
    
            this.SetManageState('Users');

            this.FacebookLoginFormGroup = this.formBldr.group({
                fbappid: new FormControl(''),
                appsecret: new FormControl(''),
            })

            this.GoogleLoginFormGroup = this.formBldr.group({
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

        public OnProviderToggleChange(value){
            if (value.isChecked === true) {
                this.FacebookToggle = true;            
            }

            if (value.isChecked === false) {
                this.FacebookToggle = false;
            }
        }
    
        //	Helpers
        protected buildFacebookModelFromForm(): FacebookLoginModel {
            return{
                AppID: this.FacebookLoginFormGroup.get('appid').value,
                AppSecret: this.FacebookLoginFormGroup.get('appsecret').value,
            }
        }

        protected buildGoogleModelFromForm(): GoogleLoginModel {
            return{
                AppID: this.GoogleLoginFormGroup.get('appid').value,
            }
        }
}   
