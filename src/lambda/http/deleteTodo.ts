import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteToDo } from '../../helpers/todos'
// import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    try {
        const isDeleted = await deleteToDo(todoId)
        if (isDeleted)
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: `Deleted item with ID: ${todoId}`
                })
            }
        
        return {
            statusCode: 401,
            body: "Error while deleting todo ID: " + todoId
        }
    } catch (error) {   
        return {
            statusCode: 401,
            body: "Error while deleting todo: " + JSON.stringify(error)
        }
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
