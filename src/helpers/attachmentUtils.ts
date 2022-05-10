import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.ATTACHMENT_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;

export function getUploadUrl(todoId: string) {
    // await docClient.update({
    //     TableName: toDosTable,
    //     Key: {
    //         todoId: todoId
    //     },
    //     ExpressionAttributeNames: {
    //         '#attachmentUrlToDo': 'attachmentUrl',
    //     },
    //     ExpressionAttributeValues: {
    //     ":attachmentUrl": `https://${bucketName}.s3.amazonaws.com/${todoId}`
    //     },
    //     UpdateExpression:
    //         "SET #attachmentUrlToDo = :attachmentUrl",
    //     ReturnValues: "UPDATED_NEW"
    // }).promise()
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: todoId,
        Expires: parseInt(urlExpiration)
    })
}



// function createDynamoDBClient() {
//   return new XAWS.DynamoDB.DocumentClient()
// }