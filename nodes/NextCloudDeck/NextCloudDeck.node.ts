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
import { stackFields, stackOperations } from './descriptions/StackDescription';
import { cardFields, cardOperations } from './descriptions/CardDescription';

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
      name: 'NextCloudDeck',
      color: '#1A82e2',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'nextCloudApi',
        required: true,
        displayOptions: {
          show: {
            authentication: ['accessToken'],
          },
        },
      },
      {
        name: 'nextCloudOAuth2Api',
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
          {
            name: 'Stacks',
            value: 'stacks',
          },
          {
            name: 'Cards',
            value: 'cards',
          },
        ],
        default: 'boards',
        required: true,
        description: 'Resource to consume',
      },
      ...boardOperations,
      ...boardAclOperations,
      ...stackOperations,
      ...cardOperations,
      ...boardFields,
      ...boardAclFields,
      ...stackFields,
      ...cardFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    let responseData;
    const returnData: IDataObject[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;
    let body: IDataObject = {};
    let method = '';
    let endpoint = '';
    const qs: IDataObject = {};

    const boardsUrl = 'boards';
    const stacksUrl = (boardId: string) => `boards/${boardId}/stacks`;
    const cardsUrl = (boardId: string, stackId: string) =>
      `boards/${boardId}/stacks/${stackId}/cards`;

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

          case 'stacks':
            switch (operation) {
              case 'create':
                // ----------------------------------
                //        stacks:create
                // ----------------------------------
                body = {
                  title: this.getNodeParameter('title', i),
                  order: this.getNodeParameter('order', i),
                };
                endpoint = stacksUrl(this.getNodeParameter('boardId', i) as string);
                method = 'POST';
                break;

              case 'delete':
                // ----------------------------------
                //        stacks:delete
                // ----------------------------------
                endpoint = `${stacksUrl(
                  this.getNodeParameter('boardId', i) as string
                )}/${this.getNodeParameter('stackId', i)}`;
                method = 'DELETE';
                break;

              case 'get':
                // ----------------------------------
                //        stacks:get
                // ----------------------------------
                endpoint = `${stacksUrl(
                  this.getNodeParameter('boardId', i) as string
                )}/${this.getNodeParameter('stackId', i)}`;
                method = 'GET';
                break;

              case 'list':
                // ----------------------------------
                //        stacks:list
                // ----------------------------------
                endpoint = `${stacksUrl(
                  this.getNodeParameter('boardId', i) as string
                )}/archived`;
                method = 'GET';
                break;

              case 'listArchived':
                // ----------------------------------
                //        stacks:listArchived
                // ----------------------------------
                endpoint = stacksUrl(this.getNodeParameter('boardId', i) as string);
                method = 'GET';
                break;

              case 'update':
                // ----------------------------------
                //        stacks:update
                // ----------------------------------
                body = {
                  title: this.getNodeParameter('title', i),
                  order: this.getNodeParameter('order', i),
                  type: this.getNodeParameter('type', i),
                  description: this.getNodeParameter('description', i),
                  dueDate: this.getNodeParameter('dueDate', i),
                };
                endpoint = `${stacksUrl(
                  this.getNodeParameter('boardId', i) as string
                )}/${this.getNodeParameter('stackId', i)}`;
                method = 'PUT';
                break;

              default:
                break;
            }
            break;

          case 'cards':
            switch (operation) {
              case 'create':
                // ----------------------------------
                //        cards:create
                // ----------------------------------
                body = {
                  title: this.getNodeParameter('title', i),
                  order: this.getNodeParameter('order', i),
                };
                endpoint = cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                );
                method = 'POST';
                break;

              case 'delete':
                // ----------------------------------
                //        cards:delete
                // ----------------------------------
                endpoint = `${cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                )}/${this.getNodeParameter('cardId', i)}`;
                method = 'DELETE';
                break;

              case 'get':
                // ----------------------------------
                //        cards:get
                // ----------------------------------
                endpoint = `${cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                )}/${this.getNodeParameter('cardId', i)}`;
                method = 'GET';
                break;

              case 'list':
                // ----------------------------------
                //        cards:list
                // ----------------------------------
                endpoint = cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                );
                method = 'GET';
                break;

              case 'update':
                // ----------------------------------
                //        cards:update
                // ----------------------------------
                body = {
                  title: this.getNodeParameter('title', i),
                  order: this.getNodeParameter('order', i),
                  type: this.getNodeParameter('type', i),
                  owner: this.getNodeParameter('owner', i),
                  description: this.getNodeParameter('description', i),
                  dueDate: this.getNodeParameter('dueDate', i),
                };
                endpoint = `${cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                )}/${this.getNodeParameter('cardId', i)}`;
                method = 'PUT';
                break;

              case 'assignLabel':
                // ----------------------------------
                //        cards:assignLabel
                // ----------------------------------
                body = {
                  labelId: this.getNodeParameter('labelId', i),
                };

                endpoint = `${cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                )}/${this.getNodeParameter('cardId', i)}/assignLabel`;
                method = 'PUT';
                break;

              case 'removeLabel':
                // ----------------------------------
                //        cards:removeLabel
                // ----------------------------------
                body = {
                  labelId: this.getNodeParameter('labelId', i),
                };
                endpoint = `${cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                )}/${this.getNodeParameter('cardId', i)}/removeLabel`;
                method = 'PUT';
                break;

              case 'assignUser':
                // ----------------------------------
                //        cards:assignUser
                // ----------------------------------
                body = {
                  userId: this.getNodeParameter('userId', i),
                };
                endpoint = `${cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                )}/${this.getNodeParameter('cardId', i)}/assignUser`;
                method = 'PUT';
                break;

              case 'removeUser':
                // ----------------------------------
                //        cards:removeUser
                // ----------------------------------
                body = {
                  userId: this.getNodeParameter('userId', i),
                };
                endpoint = `${cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                )}/${this.getNodeParameter('cardId', i)}/unassignUser`;
                method = 'PUT';
                break;

              case 'reorder':
                // ----------------------------------
                //        cards:reorder
                // ----------------------------------
                body = {
                  order: this.getNodeParameter('order', i),
                  stackIdDest: this.getNodeParameter('stackIdDest', i),
                };
                endpoint = `${cardsUrl(
                  this.getNodeParameter('boardId', i) as string,
                  this.getNodeParameter('stackId', i) as string
                )}/${this.getNodeParameter('cardId', i)}/reorder`;
                method = 'PUT';
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
          body,
          {},
          undefined,
          qs
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
        } else if (responseData !== undefined && responseData !== null) {
          returnData.push(responseData as IDataObject);
        } else {
          returnData.push({} as IDataObject);
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
