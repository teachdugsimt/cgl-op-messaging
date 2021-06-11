import { FastifySchema } from "fastify";

const responseTemplate: any = {
  statusCode: { type: 'number' },
  header: { type: 'object' },
}

const emailSchema: FastifySchema = {
  body: {
    properties: {
      email: { type: 'string' },
      subject: { type: 'string' },
      bodyText: { type: 'string' }
    },
    required: ['email', 'subject', 'bodyText']
  },
  response: {
    200: {
      type: 'object',
      properties: responseTemplate,
      additionalProperties: true
    }
  }
}

export default emailSchema
