module.exports = {
  openapi: '3.0.1',
  info: {
    title: 'Customers API',
    description: 'User management API',
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server',
    },
  ],
  security: {
    bearerAuth: [],
  },
  tags: [
    {
      name: 'CRUD operations',
    },
  ],
  paths: {
    '/api/users': {
      post: {
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        description: 'Create user',
        responses: {
          '200': {
            description: 'User created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id_token: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'A user with that email already exists',
          },
          '401': {
            description: 'You must send username and password',
          },
        },
      },
    },
    '/api/sessions/create': {
      post: {
        description: 'login',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User successfully login',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id_token: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: ' You must send email and password',
          },
          '401': {
            description: 'Invalid email or password',
          },
        },
      },
    },
    '/api/transactions': {
      get: {
        security: {
          bearerAuth: [],
        },
        description: 'List of logged user transactions',
        responses: {
          '200': {
            description: 'transaction list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    trans_token: {
                      $ref: '#components/schemas/Transactions',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'UnauthorizedError - Invalid User',
          },
        },
      },

      post: {
        security: {
          bearerAuth: [],
        },
        description: 'Create a transaction',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  amount: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Transaction created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    trans_token: {
                      $ref: '#components/schemas/Transactions',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: ' user not found  -   balance exceeded',
          },
          '401': {
            description: 'UnauthorizedError - Invalid User',
          },
        },
      },
    },
    '/api/user-info': {
      get: {
        description: 'Logged user info',
        security: {
          bearerAuth: [],
        },
        responses: {
          '200': {
            description: 'transaction list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    name: {
                      type: 'string',
                    },
                    email: {
                      type: 'string',
                    },
                    balance: {
                      type: 'integer',
                    },
                  },
                },
              },
            },
          },

          '400': {
            description: 'user not found',
          },
          '401': {
            description: 'UnauthorizedError - Invalid User',
          },
        },
      },
    },
    '/api/users/list': {
      post: {
        security: {
          bearerAuth: [],
        },
        description: 'Create a transaction',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  filter: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Transaction created',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                      },
                      name: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description:
              ' UnauthorizedError -  Invalid user -  No search string',
          },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Transactions: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          date: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          amount: {
            type: 'integer',
          },
          balance: {
            type: 'integer',
          },
        },
      },
    },
  },
};
