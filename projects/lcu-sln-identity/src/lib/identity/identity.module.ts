import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatTabsModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatPaginatorModule, MatTableModule, MatDialogModule } from '@angular/material';
=======
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatPaginatorModule, MatTableModule, MatDialogModule, MatTabsModule } from '@angular/material';
>>>>>>> 75066ef2743d34a08a6a757d074ab9832203abe1
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FathymSharedModule } from '@lcu/hosting';
import { BaseSolutionModule } from '@lcu/solutions';
import { NgxMarkdownDocsModule } from '@lowcodeunit/ngx-markdown-docs';
import { ForgeIdentitySolutionManage } from './manage/identity-manage.component';
import { ForgeIdentitySolutionDocumentation } from './documentation/identity-documentation.component';
import { ForgeIdentitySolutionHeading } from './heading/identity-heading.component';
import { ForgeIdentitySolutionMarketplace } from './marketplace/identity-marketplace.component';
import { ForgeIdentitySolutionOverview } from './overview/identity-overview.component';
import { ForgeIdentitySolutionManageClaimDialog } from './dialogs/identity-manage-claim/identity-manage-claim.dialog';


export class ForgeIdentitySolutionDisplayModule extends BaseSolutionModule {
	public Documentation() {
		return ForgeIdentitySolutionDocumentation;
	}

	public Heading() {
		return ForgeIdentitySolutionHeading;
	}

	public Manage() {
		return ForgeIdentitySolutionManage;
	}

	public Marketplace() {
		return ForgeIdentitySolutionMarketplace;
	}

	public Overview() {
		return ForgeIdentitySolutionOverview;
	}
}

var comps = [
	ForgeIdentitySolutionDocumentation,
	ForgeIdentitySolutionHeading,
	ForgeIdentitySolutionManage,
	ForgeIdentitySolutionMarketplace,
	ForgeIdentitySolutionOverview,
	ForgeIdentitySolutionManageClaimDialog,
];

@NgModule({
	imports: [
		FathymSharedModule,
		NgxMarkdownDocsModule,
		FlexLayoutModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		ReactiveFormsModule
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
export class ForgeIdentitySolutionModule {
}
