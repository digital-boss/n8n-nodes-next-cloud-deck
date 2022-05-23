import { IExecuteFunctions } from "n8n-core";

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from "n8n-workflow";

import { boardFields, boardOperations } from "./descriptions";

import { nextCloudApiRequest } from "./GenericFunctions";

import { version } from "../version";

export class NextCloudDeck implements INodeType {
	description: INodeTypeDescription = {
		displayName: "NextCloudDeck",
		name: "nextCloudDeck",
		icon: "file:nextCloud.svg",
		group: ["transform"],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume NextCloud Deck API (v.${version})`,
		defaults: {
			name: "NextcloudDeck",
			color: "#1A82e2",
		},
		inputs: ["main"],
		outputs: ["main"],
		credentials: [
			{
				name: "nextCloudDeckApi",
				required: true,
			},
		],
		properties: [
			{
				displayName: "Resource",
				name: "resource",
				type: "options",
				options: [
					{
						name: "boards",
						value: "boards",
					},
				],
				default: "boards",
				required: true,
				description: "Resource to consume",
			},
			...boardOperations,
			...boardFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter("resource", 0) as string;
		const operation = this.getNodeParameter("operation", 0) as string;
		let body: IDataObject = {};
		let method = "";
		let endpoint = "";
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			try {
				switch (resource) {
					case "boards":
						const boardsUrl = "/boards";
						switch (operation) {
							case "create":
								// ----------------------------------
								//        boards:create
								// ----------------------------------
								body = {
									title: this.getNodeParameter("title", 0),
									color: this.getNodeParameter("color", 0),
								};
								endpoint = boardsUrl;
								method = "POST";
								break;

							case "delete":
								// ----------------------------------
								//        boards:delete
								// ----------------------------------
								endpoint = `${boardsUrl}/${this.getNodeParameter("id", 0)}`;
								method = "DELETE";
								break;

							case "get":
								// ----------------------------------
								//        boards:get
								// ----------------------------------
								endpoint = `${boardsUrl}/${this.getNodeParameter("id", 0)}`;
								method = "GET";
								break;

							case "list":
								// ----------------------------------
								//        boards:list
								// ----------------------------------
								Object.assign(
									qs,
									this.getNodeParameter("additionalParameters", 0)
								);
								endpoint = boardsUrl;
								method = "GET";
								break;

							case "update":
								// ----------------------------------
								//        boards:update
								// ----------------------------------
								body = {
									title: this.getNodeParameter("title", 0),
									color: this.getNodeParameter("color", 0),
								};
								endpoint = `${boardsUrl}/${this.getNodeParameter("id", 0)}`;
								method = "PUT";
								break;

							case "addAcl":
								// ----------------------------------
								//        boards:addAcl
								// ----------------------------------
								body = {
									type: this.getNodeParameter("type", 0),
									participant: this.getNodeParameter("participant", 0),
									permissionEdit: this.getNodeParameter("permissionEdit", 0),
									permissionShare: this.getNodeParameter("permissionShare", 0),
									permissionManage: this.getNodeParameter(
										"permissionManage",
										0
									),
								};
								endpoint = `${boardsUrl}/${this.getNodeParameter("id", 0)}/acl`;
								method = "POST";
								break;

							default:
								break;
						}
						break;

					default:
						break;
				}

				responseData = await nextCloudApiRequest.call(
					this,
					method,
					endpoint,
					qs,
					body
				);

				if (!responseData) {
					responseData = { success: true };
				}

				if (responseData?.name === "Error") {
					throw new NodeApiError(this.getNode(), responseData);
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else if (responseData !== undefined) {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
