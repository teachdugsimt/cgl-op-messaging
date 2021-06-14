import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
import LineService from '../services/line.service';
import lineSchema from './line.schema';

@Controller({ route: '/api/v1/messaging/line' })
export default class LineController {

  private lineService = getInstanceByToken<LineService>(LineService);

  @POST({
    url: '/send',
    options: {
      schema: lineSchema,
    }
  })
  async sendNotifyHandler(
    req: FastifyRequest<{
      Headers: {
        'x-line-group-token': string
      }
      Body: {
        message: string
      }
    }>,
    reply: FastifyReply
  ): Promise<any> {

    const result = await this.lineService.notify(
      req.headers["x-line-group-token"],
      req.body.message
    )
    return {
      statusCode: 200,
      headers: {},
      body: result
    }
  }
}
