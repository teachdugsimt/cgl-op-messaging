import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
import { Not } from 'typeorm';
import TokenRepository from '../repositories/token.repository';

import NotificationService from '../services/notification.service'
import notificationSchema, { addTokenSchema, IFNewJobMessageType, newJobMessageSchema } from './notification.schema';

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

  @POST({
    url: '/new-job',
    options: {
      schema: newJobMessageSchema
    }
  })
  async sendNewJob(
    req: FastifyRequest<IFNewJobMessageType>,
    reply: FastifyReply
  ): Promise<any> {

    console.log("REQ BODY", req.body)

    let tokens = (await tokenRepo.find({
      where: {
        userId: Not(req.body.userId)
      }
    })).map(e => e.fcmToken)

    console.log("TOKENS ", tokens)

    if (tokens.length) {
      const result = await this.notificationService.pushMessage(
        tokens, "คาร์โก้ลิ้งค์ มีงานใหม่ที่คุณอาจสนใจ",
        `งานขนส่ง ${req.body.jobData.productName}, ${req.body.jobData.pickupPoint} => ${req.body.jobData.deliveryPoint}`,
        `cgl://job/detail/${req.body.jobData.jobId}`
      )
      reply.send(result)
    } else {
      reply.send({})
    }
    // console.log(result)

  }
}
