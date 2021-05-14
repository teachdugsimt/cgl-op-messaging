import AWS from 'aws-sdk';
AWS.config.update({ region: 'ap-southeast-1' })

export const smsSender = async (message, phoneNumber) => {
  var smsAttributes = {
    attributes: {
      'DefaultSMSType': 'Transactional', /* highest reliability */
    },
  };
  var params = {
    Message: message, /* required */
    PhoneNumber: phoneNumber
  }

  var sns = new AWS.SNS({ apiVersion: '2010-03-31' })
  let attr = await sns.setSMSAttributes(smsAttributes).promise()
  let response = await sns.publish(params).promise()
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(response)
  }
}
