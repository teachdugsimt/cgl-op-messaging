import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
import TokenRepository from '../repositories/token.repository';

import NotificationService from '../services/notification.service'
import notificationSchema, { addTokenSchema } from './notification.schema';

const tokenRepo = new TokenRepository()

@Controller({ route: '/api/v1/messaging/notification' })
export default class NotificationController {

  private notificationService = getInstanceByToken<NotificationService>(NotificationService);

  @POST({
    url: '/send',
    options: {
      schema: notificationSchema,
    }
  })
  async sendSmsHandler(
    req: FastifyRequest<{
      Body: {
        tokens: string[],
        title: string,
        message: string
      }
    }>,
    reply: FastifyReply
  ): Promise<any> {

    // console.log(req.body.bodyText)
    const result = await this.notificationService.pushMessage(req.body.tokens, req.body.title, req.body.message)

    // return result
    reply.send(result)
  }

  @POST({
    url: '/add-token',
    options: {
      schema: addTokenSchema
    }
  })
  async addToken(
    req: FastifyRequest<{
      Body: {
        token: string,
        userId: string,
        bundleId?: string,
        platform?: string
      }
    }>,
    reply: FastifyReply
  ): Promise<any> {
    const { token: fcmToken, userId, bundleId, platform } = req.body

    const result = await tokenRepo.add({
      fcmToken, userId, bundleId, platform
    })
    reply.send(result)
  }

  @GET({
    url: '/tokens',
  })
  async find(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<any> {
    // const { token: fcmToken, userId, bundleId, platform } = req.body

    const result = await tokenRepo.find({})
    reply.send(result)
  }
}
