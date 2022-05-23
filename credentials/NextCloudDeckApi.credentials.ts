import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NextCloudDeckApi implements ICredentialType {
	name = 'nextCloudDeckApi';
	displayName = 'NextCloud Deck API';
	documentationUrl = 'nextCloudDeck';
	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
		},
	];
}
