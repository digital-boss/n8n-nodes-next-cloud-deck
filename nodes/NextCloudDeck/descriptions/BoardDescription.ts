import { INodeProperties } from 'n8n-workflow';

export const boardOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['boards'],
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
        name: 'Update',
        value: 'update',
        description: 'Update an entry',
      },
    ],
    default: 'create',
    description: 'The operation to perform',
  },
];

export const boardFields: INodeProperties[] = [
  /*-------------------------------------------------------------------------- */
  /*                                boards:create                             */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['boards'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The title of the new board',
  },
  {
    displayName: 'Color',
    name: 'color',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['boards'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The hexadecimal color of the new board (e.g. FF0000)',
  },

  /*-------------------------------------------------------------------------- */
  /*                                boards:delete                            */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'ID',
    name: 'id',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['boards'],
        operation: ['delete'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                boards:get	                             */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'ID',
    name: 'id',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['boards'],
        operation: ['get'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                boards:list                              */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Additional Parameters',
    name: 'additionalParameters',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['boards'],
        operation: ['list'],
      },
    },
    options: [
      {
        displayName: 'Details',
        name: 'details',
        type: 'boolean',
        default: false,
      },
    ],
  },

  /*-------------------------------------------------------------------------- */
  /*                                boards:update	                           */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'ID',
    name: 'id',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['boards'],
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
        resource: ['boards'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Color',
    name: 'color',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['boards'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Archived',
    name: 'archived',
    required: true,
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['boards'],
        operation: ['update'],
      },
    },
  },
];
