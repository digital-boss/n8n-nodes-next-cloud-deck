import { IExecuteFunctions } from 'n8n-core';

import {
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeApiError,
} from 'n8n-workflow';

import { boardFields, boardOperations } from './descriptions/BoardDescription';
import { boardAclFields, boardAclOperations } from './descriptions/BoardAclDescription';

import { nextCloudDeckApiRequest } from './GenericFunctions';

import { version } from '../version';

export class NextCloudDeck implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Nextcloud Deck',
    name: 'nextCloudDeck',
    icon: 'file:nextCloud.png',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: `Consume NextCloud Deck API (v.${version})`,
    defaults: {
      name: 'NextcloudDeck',
      color: '#1A82e2',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'nextCloudDeckApi',
        required: true,
        displayOptions: {
          show: {
            authentication: ['accessToken'],
          },
        },
      },
        {
          name: 'nextCloudDeckOAuth2Api',
          required: true,
          displayOptions: {
            show: {
              authentication: ['oAuth2'],
            },
          },
        },
    ],
    properties: [
      {
        displayName: 'Authentication',
        name: 'authentication',
        type: 'options',
        options: [
          {
            name: 'Access Token',
            value: 'accessToken',
          },
          {
            name: 'OAuth2',
            value: 'oAuth2',
          },
        ],
        default: 'accessToken',
      },
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          {
            name: 'boards',
            value: 'boards',
          },
          {
            name: 'boards ACL',
            value: 'boardsAcl',
          },
        ],
        default: 'boards',
        required: true,
        description: 'Resource to consume',
      },
      ...boardOperations,
      ...boardAclOperations,
      ...boardFields,
      ...boardAclFields,
    ],
  };

  //   async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  async execute(this: IExecuteFunctions): Promise<any> {
    const items = this.getInputData();
    let responseData;
    const returnData: IDataObject[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;
    let body: IDataObject = {};
    let method = '';
    let endpoint = '';
    const qs: IDataObject = {};

    const boardsUrl = '/boards';

    for (let i = 0; i < items.length; i++) {
      try {
        switch (resource) {
          case 'boards':
            switch (operation) {
              case 'create':
                // ----------------------------------
                //        boards:create
                // ----------------------------------
                body = {
                  title: this.getNodeParameter('title', i),
                  color: this.getNodeParameter('color', i),
                };
                endpoint = boardsUrl;
                method = 'POST';
                break;

              case 'delete':
                // ----------------------------------
                //        boards:delete
                // ----------------------------------
                endpoint = `${boardsUrl}/${this.getNodeParameter('id', i)}`;
                method = 'DELETE';
                break;

              case 'get':
                // ----------------------------------
                //        boards:get
                // ----------------------------------
                endpoint = `${boardsUrl}/${this.getNodeParameter('id', i)}`;
                method = 'GET';
                break;

              case 'list':
                // ----------------------------------
                //        boards:list
                // ----------------------------------
                Object.assign(qs, this.getNodeParameter('additionalParameters', i));
                endpoint = boardsUrl;
                method = 'GET';
                break;

              case 'update':
                // ----------------------------------
                //        boards:update
                // ----------------------------------
                body = {
                  title: this.getNodeParameter('title', i),
                  color: this.getNodeParameter('color', i),
                };
                endpoint = `${boardsUrl}/${this.getNodeParameter('id', i)}`;
                method = 'PUT';
                break;

              default:
                break;
            }
            break;

          case 'boardsAcl':
            switch (operation) {
              case 'addAcl':
                // ----------------------------------
                //        boards ACL:addAcl
                // ----------------------------------
                body = {
                  type: this.getNodeParameter('type', i),
                  participant: this.getNodeParameter('participant', i),
                  permissionEdit: this.getNodeParameter('permissionEdit', i),
                  permissionShare: this.getNodeParameter('permissionShare', i),
                  permissionManage: this.getNodeParameter('permissionManage', i),
                };
                endpoint = `${boardsUrl}/${this.getNodeParameter('id', i)}/acl`;
                method = 'POST';
                break;

              default:
                break;
            }
            break;

          default:
            break;
        }

        responseData = await nextCloudDeckApiRequest.call(
          this,
          method,
          endpoint,
          qs,
          body
        );

        if (!responseData) {
          responseData = { success: true };
        }

        if (responseData?.name === 'Error') {
          throw new NodeApiError(this.getNode(), responseData);
        }

        responseData = JSON.parse(responseData);

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
