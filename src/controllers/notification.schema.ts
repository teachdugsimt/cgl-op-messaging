import { FastifySchema } from "fastify";

const responseTemplate: any = {
  statusCode: { type: 'number' },
  header: { type: 'object' },
}

const notificationSchema: FastifySchema = {
  body: {
    properties: {
      tokens: { type: 'array' },
      title: { type: 'string' },
      message: { type: 'string' }
    },
    required: ['tokens']
  },
  response: {
    200: {
      type: 'object',
      properties: responseTemplate,
      additionalProperties: true
    }
  }
}

export default notificationSchema

export const addTokenSchema: FastifySchema = {
  body: {
    properties: {
      token: { type: 'string' },
      userId: { type: 'string' },
      bundleId: { type: 'string' },
      platform: { type: 'string' }
    },
    required: ['token', 'userId']
  }
}

export interface IFNewJobMessageType {
  Body: {
    userId: string,
    jobData: {
      jobId: string,
      productType: string,
      productName: string,
      pickupPoint: string,
      deliveryPoint: string
    }
  }
}

export const newJobMessageSchema: FastifySchema = {
  body: {
    properties: {
      userId: { type: 'string' },
      jobData: {
        type: 'object',
        properties: {
          jobId: { type: 'string' },
          productType: { type: 'string' },
          productName: { type: 'string' },
          pickupPoint: { type: 'string' },
          deliveryPoint: { type: 'string' }
        }
      }
    },
    required: ['userId', 'jobData']
  }
}
