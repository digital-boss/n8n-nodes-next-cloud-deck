import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class NextCloudDeckApi implements ICredentialType {
  name = 'nextCloudDeckApi';
  displayName = 'nextCloud Deck API';
  documentationUrl = 'nextcloud';
  properties: INodeProperties[] = [];
}
