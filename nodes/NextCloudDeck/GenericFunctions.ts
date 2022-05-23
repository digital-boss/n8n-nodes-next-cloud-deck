import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import {
	IDataObject,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

export async function nextCloudApiRequest(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: string, endpoint: string, body: object = {}, qs: object = {}, uri?: string): Promise<any> { // tslint:disable-line:no-any

	//Get credentials the user provided for this node
	const credentials = await this.getCredentials('nextCloudDeckApi') as IDataObject;

	if (credentials === undefined) {
		throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
	}

	//Make http request according to <https://sendgrid.com/docs/api-reference/>
	const options: OptionsWithUri = {
		method,
		auth: {
			username: credentials.username as string,
			password: credentials.password as string,
		},
		qs,
		body,
		uri: uri || `https://clouddemo.digital-boss.cloud/apps/deck/api/v1.0${endpoint}`,
		json: true,
	};

	if (Object.keys(options.qs).length === 0) {
		delete options.qs;
	}
	if (Object.keys(options.body).length === 0) {
		delete options.body;
	}

	try {
		return this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}