import { Service, Initializer, Destructor } from 'fastify-decorators';
import * as AWS from 'aws-sdk'

const aws_region = "ap-southeast-1"
AWS.config.update({ region: aws_region });

// var credentials = new AWS.SharedIniFileCredentials({ profile: 'cgl-dev' });
// AWS.config.credentials = credentials;

const pinpoint = new AWS.Pinpoint()
const projectId: any = process.env.PINPOINT_PROJECT_ID



@Service()
export default class EmailService {
  // @Initializer()
  // async init(): Promise<void> {
  // }

  async sendEmail(email: string, subject: string, bodyText: string): Promise<any> {
    const charset = 'UTF-8'

    var params = {
      ApplicationId: projectId,
      MessageRequest: {
        Addresses: {
          [email]: {
            ChannelType: 'EMAIL'
          }
        },
        MessageConfiguration: {
          EmailMessage: {
            FromAddress: "info@infiltech.org",
            SimpleEmail: {
              Subject: {
                Charset: charset,
                Data: subject
              },
              HtmlPart: {
                Charset: charset,
                Data: bodyText
              }
            }
          }
        },
      }
    };
    return pinpoint.sendMessages(params).promise();
  }

  @Destructor()
  async destroy(): Promise<void> {
  }
}
