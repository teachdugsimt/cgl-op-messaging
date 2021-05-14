import { FastifySchema } from "fastify";

const responseTemplate: any = {
  statusCode: { type: 'number' },
  header: { type: 'object' },
  body: { type: 'string' },
}

const pingSchema: FastifySchema = {
  body: {
    message: { type: 'string' },
    phoneNumber: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      properties: responseTemplate,
      additionalProperties: false
    },
    400: {
      type: 'object',
      properties: responseTemplate,
      additionalProperties: false
    },
    403: {
      type: 'object',
      properties: responseTemplate,
      additionalProperties: false
    }
  }
}

export default pingSchema
