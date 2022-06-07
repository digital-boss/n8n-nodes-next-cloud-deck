import { INodeProperties } from 'n8n-workflow';

export const stackOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['stacks'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create an entry',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete an entry',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get data of an entry',
      },
      {
        name: 'List',
        value: 'list',
        description: 'Get data of all entries',
      },
      {
        name: 'List archived',
        value: 'listArchived',
        description: 'Get archived data of an entry',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an entry',
      },
      {
        name: 'Add Acl',
        value: 'addAcl',
        description: 'Add new acl rule',
      },
    ],
    default: 'create',
    description: 'The operation to perform',
  },
];

export const stackFields: INodeProperties[] = [
  /*-------------------------------------------------------------------------- */
  /*                                stacks:create                              */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The title of the new stack',
  },
  {
    displayName: 'Order',
    name: 'order',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['create'],
      },
    },
    default: 0,
    description: 'Order for sorting the stacks',
  },

  /*-------------------------------------------------------------------------- */
  /*                                stacks:delete                            */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['delete'],
      },
    },
  },
  {
    displayName: 'Stack ID',
    name: 'stackId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['delete'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                stacks:list                                */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['list'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                stacks:listArchived	                       */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['listArchived'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                stacks:get	                               */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Stack ID',
    name: 'stackId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['get'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                stacks:update	                           */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Stack ID',
    name: 'stackId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Title',
    name: 'title',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Order',
    name: 'order',
    required: true,
    type: 'number',
    default: 0,
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['update'],
      },
    },
    description: 'Order for sorting the stacks',
  },
  {
    displayName: 'Archived',
    name: 'archived',
    required: true,
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['stacks'],
        operation: ['update'],
      },
    },
  },
];
