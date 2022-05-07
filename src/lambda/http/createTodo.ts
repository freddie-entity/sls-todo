import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import { getUserId } from '../utils';
import { createToDo } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)

    console.log(event)

    // TODO: Implement creating a new TODO item
    try {
        const item = await createToDo(newTodo, 'thisismockjwttoken')
        return {
            statusCode: 200,
            body: JSON.stringify({
                newItem: item
            })
        }
    } catch (error) {   
        return {
            statusCode: 401,
            body: "Error while creating todo: " + JSON.stringify(error)
        }
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
