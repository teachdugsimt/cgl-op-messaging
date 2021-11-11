import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
import LineService from '../services/line.service';
import lineSchema, { listUsersSchema } from './line.schema';

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

    if (result.data.status == 200) {
      return result.data
    }
  }


  @GET({
    url: '/list-users',
    options: {
      schema: listUsersSchema,
    }
  })
  async getListUserWhoAddFriend(req: FastifyRequest<{ Headers: { authorization: string }, Querystring: { start: string } }>, reply: FastifyReply): Promise<any> {
    const result = await this.lineService.listUsers(
      req.headers.authorization,
      req.query.start
    )

    console.log("Result :: ", result)

    if (result.data.status == 200) {
      return result.data
    }
  }

  @POST({
    url: '/boardcast',
    options: {
      schema: listUsersSchema,
    }
  })
  async pushMultipleMessage(req: FastifyRequest<{ Body: { jobId: string } }>, reply: FastifyReply): Promise<any> {
    const CHANNEL_ACCESS_TOKEN: string = process.env.CHANNEL_ACCESS_TOKEN || `lNihXk/rkTAUvTrDhiKl4qxZoXno64fiw/FNcikJ1e6X4hI1WUQlPUlZqODDW0F4FgNJLRGOyzzQJV0a3Cd/QdZEhXVcc8eV9+NnXgdcSyEioxpjA14/9HMXcvaOh5bYQKEWeUd8X9GAJB0h/iZFZQdB04t89/1O/w1cDnyilFU=`
    const body = typeof req.body == 'string' ? JSON.parse(req.body) : req.body
    const result = await this.lineService.boardcast(CHANNEL_ACCESS_TOKEN, body.jobId)
    console.log("Result :: ", result)
    if (result.status == 200) {
      return result.data
    }
  }


}
