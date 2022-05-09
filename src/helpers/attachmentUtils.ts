// import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'

// const XAWS = AWSXRay.captureAWS(AWS)

// // TODO: Implement the fileStogare logic
// const s3 = new XAWS.S3({
//   signatureVersion: 'v4'
// })
// const toDosTable = process.env.TODOS_TABLE
// const bucketName = process.env.IMAGES_S3_BUCKET
// function getUploadUrl(imageId: string) {
//   return s3.getSignedUrl('putObject', {
//     Bucket: bucketName,
//     Key: imageId,
//     Expires: urlExpiration
//   })
// }