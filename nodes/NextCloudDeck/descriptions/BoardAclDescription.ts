import { INodeProperties } from 'n8n-workflow';

export const boardAclOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['boardsAcl'],
      },
    },
    options: [
      {
        name: 'Add Acl',
        value: 'addAcl',
        description: 'Add new acl rule',
      },
    ],
    default: 'addAcl',
    description: 'The operation to perform',
  },
];

export const boardAclFields: INodeProperties[] = [
  /*-------------------------------------------------------------------------- */
  /*                                boards ACL:addAcl	                       */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'ID',
    name: 'id',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['boardsAcl'],
        operation: ['addAcl'],
      },
    },
  },
  {
    displayName: 'Type',
    name: 'type',
    required: true,
    type: 'options',
    default: '',
    displayOptions: {
      show: {
        resource: ['boardsAcl'],
        operation: ['addAcl'],
      },
    },
    options: [
      {
        name: 'User',
        value: 0,
      },
      {
        name: 'Group',
        value: 1,
      },
      {
        name: 'Circle',
        value: 7,
      },
    ],
  },
  {
    displayName: 'Participant',
    name: 'participant',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['boardsAcl'],
        operation: ['addAcl'],
      },
    },
  },
  {
    displayName: 'Permission Edit',
    name: 'permissionEdit',
    required: true,
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['boardsAcl'],
        operation: ['addAcl'],
      },
    },
  },
  {
    displayName: 'Permission Share',
    name: 'permissionShare',
    required: true,
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['boardsAcl'],
        operation: ['addAcl'],
      },
    },
  },
  {
    displayName: 'Permission Manage',
    name: 'permissionManage',
    required: true,
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['boardsAcl'],
        operation: ['addAcl'],
      },
    },
  },
];
