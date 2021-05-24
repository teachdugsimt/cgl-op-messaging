import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
import PingService from '../services/ping.service';
import pingSchema from './ping.schema';
import { phoneIsValid } from '../services/phoneValidator'
import { smsSender } from '../services/sendSms'
import { thsmsSender } from '../services/sendSmsTh'
console.log("Function Ping Controller :: ")
@Controller({ route: '/api/v1/send-sms' })
export default class PingController {

  private pingService = getInstanceByToken<PingService>(PingService);

  @GET({
    url: '/ping',
    options: {
      schema: pingSchema
    }
  })
  async pingHandler(req: FastifyRequest, reply: FastifyReply): Promise<object> {
    console.log("Ping Service :: here")
    return { message: this.pingService?.ping() }
  }

  @POST({
    url: '/sms',
    options: {
      schema: pingSchema
    }
  })
  async sendSmsHandler(req: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      console.log("Event : ", req)
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
      console.log("Phone valid :: ", phoneValid)
      if (phoneValid && !phoneValid.isValid && phoneValid.country == 'TH') {
        console.log("Phone Code TH")
        if (await thsmsSender(body_data.message, phoneValid.phoneNumber)) {
          console.log("Send TH mail success")
          reply.status(200).send({
            statusCode: 200,
            headers: {},
            body: 'Success (Using THSMS service)'
          })
        }
      } else if (phoneValid && !phoneValid.isValid) {
        console.log("Phone number invalid")
        reply.status(400).send({
          statusCode: 400,
          headers: {},
          body: "Bad Request : Invalide phone number"
        })
      }
      const response = await smsSender(body_data.message, body_data.phoneNumber)
      return response

    } catch (error) {
      let body = error.stack || JSON.stringify(error, null, 2);
      console.log("Error Catch :: ", error)
      return {
        statusCode: 403,
        headers: {},
        body: JSON.stringify(body)
      }
    }
  }
}
