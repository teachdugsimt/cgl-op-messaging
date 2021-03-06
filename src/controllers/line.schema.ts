import { FastifySchema } from "fastify";

const responseTemplate: any = {
  statusCode: { type: 'number' },
  header: { type: 'object' },
}

const lineSchema: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      'x-line-group-token': { type: 'string' }
    },
    required: ['x-line-group-token']
  },
  body: {
    properties: {
      message: { type: 'string' }
    },
    required: ['message']
  },
  response: {
    200: {
      type: 'object',
      properties: responseTemplate,
      additionalProperties: true
    }
  }
}

export default lineSchema



export const listUsersSchema: FastifySchema = {
  // headers: {
  //   type: 'object',
  //   properties: {
  //     'authorization': { type: 'string' },
  //   },
  //   required: ['authorization']
  // },
  body: {
    type: 'object',
    properties: {
      jobId: { type: 'string' }
    },
  },
  response: {
    200: {
      type: 'object',
      properties: responseTemplate,
      additionalProperties: true
    }
  }
}
