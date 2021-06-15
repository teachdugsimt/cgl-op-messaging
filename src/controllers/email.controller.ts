import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
// import ValidateParam from '../services/validate-param.service';

import EmailService from '../services/email.service'
import emailSchema from './email.schema';

@Controller({ route: '/api/v1/messaging/email' })
export default class EmailController {

  private emailService = getInstanceByToken<EmailService>(EmailService);

  @POST({
    url: '/send',
    options: {
      schema: emailSchema,
    }
  })
  async sendSmsHandler(
    req: FastifyRequest<{
      Body: {
        email: string,
        subject: string,
        bodyText: string
      }
    }>,
    reply: FastifyReply
  ): Promise<any> {

    console.log(req.body.bodyText)
    const result = await this.emailService.sendEmail(req.body.email, req.body.subject, req.body.bodyText)

    return {
      statusCode: 200,
      // headers: {},
      // body: result
    }
  }
}
