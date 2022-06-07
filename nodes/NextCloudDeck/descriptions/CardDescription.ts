import { INodeProperties } from 'n8n-workflow';

export const cardOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['cards'],
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
        name: 'Update',
        value: 'update',
        description: 'Update an entry',
      },
      {
        name: 'Assign label',
        value: 'assignLabel',
        description: 'Assign label to a card',
      },
      {
        name: 'Remove label',
        value: 'removeLabel',
        description: 'Remove label from a card',
      },
      {
        name: 'Assign user',
        value: 'assignUser',
        description: 'Assign user to a card',
      },
      {
        name: 'Remove user',
        value: 'removeUser',
        description: 'Remove user from a card',
      },
      {
        name: 'Reorder',
        value: 'reorder',
        description: 'Change the sorting order of a card',
      },
    ],
    default: 'create',
    description: 'The operation to perform',
  },
];

export const cardFields: INodeProperties[] = [
  /*-------------------------------------------------------------------------- */
  /*                                cards:create                               */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['create'],
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
        resource: ['cards'],
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
        resource: ['cards'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The title of the new card',
  },
  {
    displayName: 'Order',
    name: 'order',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['create'],
      },
    },
    default: 0,
    description: 'Order for sorting the cards',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'Type of the card (for later use) use <plain> for now',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The markdown description of the card',
  },
  {
    displayName: 'Due date',
    name: 'dueDate',
    type: 'dateTime',
    required: false,
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The duedate of the card or null',
  },

  /*-------------------------------------------------------------------------- */
  /*                                cards:delete                               */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
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
        resource: ['cards'],
        operation: ['delete'],
      },
    },
  },
  {
    displayName: 'Card ID',
    name: 'cardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['delete'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                cards:get 	                               */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
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
        resource: ['cards'],
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Card ID',
    name: 'cardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['get'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                cards:update   	                           */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
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
        resource: ['cards'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Card ID',
    name: 'cardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['update'],
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
        resource: ['cards'],
        operation: ['update'],
      },
    },
    default: '',
    description: 'The title of the new card',
  },
  {
    displayName: 'Order',
    name: 'order',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['update'],
      },
    },
    default: 0,
    description: 'Order for sorting the cards',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['update'],
      },
    },
    default: '',
    description: 'Type of the card (for later use) use <plain> for now',
  },
  {
    displayName: 'Owner',
    name: 'owner',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['update'],
      },
    },
    default: '',
    description: 'The owner of the card',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['update'],
      },
    },
    default: '',
    description: 'The markdown description of the card',
  },
  {
    displayName: 'Due date',
    name: 'dueDate',
    type: 'dateTime',
    required: false,
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['update'],
      },
    },
    default: '',
    description: 'The duedate of the card',
  },

  /*-------------------------------------------------------------------------- */
  /*                                cards:assignLabel   	                     */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['assignLabel'],
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
        resource: ['cards'],
        operation: ['assignLabel'],
      },
    },
  },
  {
    displayName: 'Card ID',
    name: 'cardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['assignLabel'],
      },
    },
  },
  {
    displayName: 'Label ID',
    name: 'labelId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['assignLabel'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                cards:removeLabel   	                     */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['removeLabel'],
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
        resource: ['cards'],
        operation: ['removeLabel'],
      },
    },
  },
  {
    displayName: 'Card ID',
    name: 'cardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['removeLabel'],
      },
    },
  },
  {
    displayName: 'Label ID',
    name: 'labelId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['removeLabel'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                cards:assignUser    	                     */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['assignUser'],
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
        resource: ['cards'],
        operation: ['assignUser'],
      },
    },
  },
  {
    displayName: 'Card ID',
    name: 'cardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['assignUser'],
      },
    },
  },
  {
    displayName: 'User ID',
    name: 'userId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['assignUser'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                cards:removeUser    	                     */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['removeUser'],
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
        resource: ['cards'],
        operation: ['removeUser'],
      },
    },
  },
  {
    displayName: 'Card ID',
    name: 'cardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['removeUser'],
      },
    },
  },
  {
    displayName: 'User ID',
    name: 'userId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['removeUser'],
      },
    },
  },

  /*-------------------------------------------------------------------------- */
  /*                                cards:reorder        	                     */
  /* ------------------------------------------------------------------------- */
  {
    displayName: 'Board ID',
    name: 'boardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['reorder'],
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
        resource: ['cards'],
        operation: ['reorder'],
      },
    },
  },
  {
    displayName: 'Card ID',
    name: 'cardId',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['reorder'],
      },
    },
  },
  {
    displayName: 'Order',
    name: 'order',
    required: true,
    type: 'number',
    default: 0,
    description: 'The position in the stack where the card should be moved to',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['reorder'],
      },
    },
  },
  {
    displayName: 'Stack ID Destination',
    name: 'stackIdDest',
    required: true,
    type: 'string',
    default: '',
    description: 'The id of the stack where the card should be moved to',
    displayOptions: {
      show: {
        resource: ['cards'],
        operation: ['reorder'],
      },
    },
  },
];
