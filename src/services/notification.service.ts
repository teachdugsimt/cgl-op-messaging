import { FastifyInstance } from 'fastify';
import {
  Service, Initializer, Destructor,
  FastifyInstanceToken, getInstanceByToken
} from 'fastify-decorators';

@Service()
export default class NotificationService {

  private instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);

  @Initializer()
  async init(): Promise<void> {
  }


  async pushMessage(tokens: string[], title: string, message: string): Promise<any> {

    const app: any = this.instance
    // console.log(tokens[0])

    const result = await app.firebase['admin']
      .messaging()
      .sendMulticast({
        // token: tokens[0],
        // validate_only: false,
        tokens: tokens,
        data: {
          url: 'cgl://job/detail/GL50VMK6'
        },
        notification: {
          title: title,
          body: message,
          // imageUrl: 'https://my-cdn.com/app-logo.png',
        },
      });

    // console.log(JSON.stringify(result))
    return result

    // return result
    // .sendToDevice(
    //   tokens, // device fcm tokens...
    //   {
    //     data: {
    //       name: 'katanyoo'
    //     },
    //   },
    //   {
    //     // Required for background/quit data-only messages on iOS
    //     contentAvailable: true,
    //     // Required for background/quit data-only messages on Android
    //     priority: 'high',
    //   },
    // );

  }


  @Destructor()
  async destroy(): Promise<void> {
  }
}
