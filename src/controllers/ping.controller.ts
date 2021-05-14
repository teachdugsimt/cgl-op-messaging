import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
import PingService from '../services/ping.service';
import pingSchema from './ping.schema';
import { phoneIsValid } from '../services/phoneValidator'
import { smsSender } from '../services/sendSms'
import { thsmsSender } from '../services/sendSmsTh'

@Controller({ route: '/api/v1/send-sms' })
export default class PingController {

  private pingService = getInstanceByToken<PingService>(PingService);

  @GET({
    url: '/',
    options: {
      schema: pingSchema
    }
  })
  async pingHandler(req: FastifyRequest, reply: FastifyReply): Promise<object> {
    return { message: this.pingService?.ping() }
  }

  @POST({
    url: '/',
    options: {
      schema: pingSchema
    }
  })
  async sendSmsHandler(req: FastifyRequest, reply: FastifyReply): Promise<object> {
    const body_data: any = req.body
    console.log("Event body :: ", body_data)
    if (!body_data.message || !body_data.phoneNumber) {
      reply.status(400).send({
        statusCode: 400,
        headers: {},
        body: "Bad Request : Invalide message or phone number"
      })
    }
    const phoneValid = await phoneIsValid(body_data.phoneNumber)
    if (phoneValid && !phoneValid.isValid && phoneValid.country == 'TH') {
      if (await thsmsSender(body_data.message, phoneValid.phoneNumber)) {
        reply.status(200).send({
          statusCode: 200,
          headers: {},
          body: 'Success (Using THSMS service)'
        })
      }
    } else if (phoneValid && !phoneValid.isValid) {
      reply.status(400).send({
        statusCode: 400,
        headers: {},
        body: "Bad Request : Invalide phone number"
      })
    }
    return smsSender(body_data.message, body_data.phoneNumber)
  }

}
