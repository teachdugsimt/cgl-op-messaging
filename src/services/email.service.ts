import { Service, Initializer, Destructor } from 'fastify-decorators';
import * as AWS from 'aws-sdk'
const nodemailer = require("nodemailer");

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
  async sendEmailByYandex(email: string, subject: string, bodyText: string): Promise<any> {
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'info@cargolink.co.th',
        pass: 'Cargolink2021'
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"CargoLink" <info@cargolink.co.th>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      // text: "Hello world?", // plain text body
      html: bodyText // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

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
