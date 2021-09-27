import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
import SmsService from '../services/sms.service';
import smsSchema from './sms.schema';
import ValidateParam from '../services/validate-param.service'

@Controller({ route: '/api/v1/messaging/sms' })
export default class SmsController {

  private smsService = getInstanceByToken<SmsService>(SmsService);

  @ValidateParam(smsSchema)
  @POST({
    url: '/send',
    options: {
      schema: smsSchema
    }
  })
  async sendSmsHandler(req: FastifyRequest<{ Body: { message: string, phoneNumber: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const result = await this.smsService.sendSms(req.body.phoneNumber, req.body.message)
      return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify(result)
      }
    } catch (error: any) {
      let body = error?.stack || JSON.stringify(error, null, 2);
      console.log("Error Catch :: ", error)
      return {
        statusCode: 403,
        headers: {},
        body: JSON.stringify(body)
      }
    }
  }
}
