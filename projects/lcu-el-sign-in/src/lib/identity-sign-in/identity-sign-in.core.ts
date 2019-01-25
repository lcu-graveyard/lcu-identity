import { ForgeRenderingDetails } from '@lcu/elements';

export class ForgeIdentitySignInDetails extends ForgeRenderingDetails<ForgeIdentitySignInConfig> {
	public SignInRedirect: string;

	public DisplayProviders: boolean;
}

export class ForgeIdentitySignInConfig {
}
