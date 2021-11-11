
// curl --location --request POST 'https://notify-api.line.me/api/notify' \
// --header 'Authorization: Bearer xxxxxxx' \
// --header 'Content-Type: application/x-www-form-urlencoded' \
// --data-urlencode 'message=นี่คือข้อความ
import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data'
import { Service, Initializer, Destructor } from 'fastify-decorators';
import { provinceListEn, provinceListTh } from './provinces';
import { MapTruckImageName } from './map-truck-img'
import moment from 'moment'
moment.locale('th');
const provinceMore = [
  { label: 'Krung Thep Maha Nakhon', value: 1, region: 1 },
  { label: 'Samut Prakan', value: 2, region: 1 },
  { label: 'อยุธยา', value: 2, region: 1 },
]

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

  async listUsers(bearerToken: string, start?: string | null): Promise<any> {

    // let bodyFormData = new FormData()
    // bodyFormData.append('start', start)
    const response = await axios({
      method: 'get',
      headers: {
        Authorization: bearerToken.includes("Bearer") ? `${bearerToken}` : `Bearer ${bearerToken}`,
        // ...bodyFormData.getHeaders()
      },
      url: 'https://api.line.me/v2/bot/followers/ids',
      // data: {}
    })
    console.log(`🚀  ->  response`, response);
    return response
  }

  findProvince(address?: string | null) {
    if (!address) return null;
    const list = [...provinceListTh, ...provinceListEn, ...provinceMore];
    const province = list.find((l) => address.includes(l.label));
    return province?.label || address;
  };
  async getJobDetail(jobId: string) {
    const url: string = process.env.API_URL ? `${process.env.API_URL}/api/v1/jobs/${jobId}` :
      `https://2kgrbiwfnc.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/jobs/${jobId}`
    return axios.get(url)
  }

  async boardcast(bearerToken: string, jobId: string): Promise<any> {
    const LIFF_ORIGIN: string = "https://liff.line.me/"
    const LIFF_ID: string = process.env.LIFF_ID || "1656270808-MA5RQ8gL"
    const BACKOFFICE_PATH: string = `/view/${jobId}`
    const finalLiff: string = LIFF_ORIGIN + LIFF_ID + BACKOFFICE_PATH
    console.log(`🚀  ->  finalLiff`, finalLiff);

    const response: AxiosResponse<any> = await this.getJobDetail(jobId)
    const { data } = response
    console.log(`🚀  ->  response : `, data);

    const loadingDate = data?.from?.dateTime ? moment(data?.from?.dateTime.split(" ")[0], "DD-MM-YYYY").format('LL') : "-";
    const loadingAddress = this.findProvince(data?.from?.name)
    const shippingAddress = this.findProvince(data?.to[0]?.name)
    const findImageName = MapTruckImageName(+data?.truckType)
    const truckImageUrl = `https://truck-type-image.s3.ap-southeast-1.amazonaws.com/vehicles/${findImageName.name}.png`
    console.log(`🚀  ->  truckImageUrl :: `, truckImageUrl);


    const templateMessage1 = {
      "messages": [
        {
          "type": "flex",
          "altText": "งานใหม่",
          "contents": {




            "type": "bubble",
            "hero": {
              "type": "image",
              "url": truckImageUrl,
              "size": findImageName?.size,
              "aspectRatio": findImageName.aspectRatio,
              "aspectMode": findImageName.aspectMode,
              ...(findImageName?.options ? findImageName.options : undefined),
              "action": {
                "type": "uri",
                "uri": finalLiff
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "weight": "bold",
                  "size": "xl",
                  "text": data?.productName || '-'
                },
                // {
                //   "type": "box",
                //   "layout": "baseline",
                //   "contents": [
                //     {
                //       "type": "text",
                //       "size": "sm",
                //       "color": "#999999",
                //       "margin": "md",
                //       "flex": 0,
                //       "text": "วันที่เริ่มงาน : " + loadingDate
                //     }
                //   ],
                //   "margin": "md",
                //   "offsetStart": "-10px"
                // },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "จุดขึ้น",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": loadingAddress || "-",
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "จุดลง",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": shippingAddress || "-",
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ],
              "offsetTop": "-15px"
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "link",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "ดูรายละเอียด",
                    "uri": finalLiff
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }





          }
        }
      ]
    }

    return axios({
      method: 'post',
      headers: {
        Authorization: bearerToken.includes("Bearer") ? `${bearerToken}` : `Bearer ${bearerToken}`,
      },
      url: 'https://api.line.me/v2/bot/message/broadcast',
      data: templateMessage1
    }).catch(err => console.log("ERROR line boardccast :: ", err?.message || JSON.stringify(err)))
  }



  @Destructor()
  async destroy(): Promise<void> {
    return;
  }
}
