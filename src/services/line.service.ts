
// curl --location --request POST 'https://notify-api.line.me/api/notify' \
// --header 'Authorization: Bearer xxxxxxx' \
// --header 'Content-Type: application/x-www-form-urlencoded' \
// --data-urlencode 'message=นี่คือข้อความ
import axios from 'axios';
import FormData from 'form-data'
import { Service, Initializer, Destructor } from 'fastify-decorators';

@Service()
export default class LineService {
  // @Initializer()
  // async init(): Promise<void> {
  //   return;
  // }

  async notify(authToken: string, message: string): Promise<any> {

    let bodyFormData = new FormData()
    bodyFormData.append('message', message)

    return axios({
      method: 'post',
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...bodyFormData.getHeaders()
      },
      url: 'https://notify-api.line.me/api/notify',
      data: bodyFormData
    })
  }

  @Destructor()
  async destroy(): Promise<void> {
    return;
  }
}
