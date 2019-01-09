import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Status } from '@lcu/common';
import { BaseModeledResponse } from '@lcu/core';
import { ClaimModel } from '@lcu/apps';

@Component({
	selector: 'forge-solution-identity-manage-claim-dialog',
	templateUrl: './identity-manage-claim.dialog.html',
	styleUrls: ['./identity-manage-claim.dialog.scss']
})
export class ForgeIdentitySolutionManageClaimDialog implements OnInit {
	//	Properties
	public Claim: ClaimModel;

	public IsCreate: boolean;

	//	Constructors
	constructor(protected dialogRef: MatDialogRef<ForgeIdentitySolutionManageClaimDialog>,
		@Inject(MAT_DIALOG_DATA) protected config: ClaimModel) {
		this.Claim = Object.assign({}, config || <any>{});
	}

	//	Life Cycle
	public ngOnInit() {
		this.IsCreate = !this.Claim.ClaimType;
	}

	//	API Methods
	public Save() {
		this.dialogRef.close(<BaseModeledResponse<ClaimModel>>{
			Model: this.Claim,
			Status: <Status>{
				Code: 0,
				Message: 'Success'
			}
		});
	}
}