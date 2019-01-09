import { Component, Injector } from '@angular/core';
import { ISolutionControl, ForgeGenericSolution } from '@lcu/solutions';

@Component({
	selector: 'forge-solution-identity-documentation',
	templateUrl: './identity-documentation.component.html',
	styleUrls: ['./identity-documentation.component.scss']
})
export class ForgeIdentitySolutionDocumentation extends ForgeGenericSolution
	implements ISolutionControl {
	//  Fields

	//  Properties
	//  Properties
	public DocsRoot: string;

	//  Constructors
	constructor(protected injector: Injector) {
		super(injector);

		this.DocsRoot = 'https://raw.githubusercontent.com/lowcodeunit/lcu-sln-identity/master/docs/';
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
}
