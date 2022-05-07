import { ToDoAccess } from './todosAccess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { TodoUpdate } from '../models/TodoUpdate'
// import { parseUserId } from '../auth/utils'
// import * as createError from 'http-errors'

const todoAccess = new ToDoAccess()

export async function getToDos(): Promise<TodoItem[]> {
  return todoAccess.getToDos()
}

export async function createToDo(
  createToDoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {

  const itemId = uuid.v4()
  // const userId = parseUserId(jwtToken)
  console.log(jwtToken)

  const newItem = {
    todoId: itemId,
    userId: 'userId',
    name: createToDoRequest.name,
    dueDate: createToDoRequest.dueDate,
    done: false,
    createdAt: new Date().toISOString()
  }

  return await todoAccess.createToDo(newItem)
}

export async function updateToDo(todoId: string, updatedTodo: TodoUpdate): Promise<TodoUpdate> {
  return todoAccess.updateToDo(todoId, updatedTodo)
}

export async function deleteToDo(todoId: string): Promise<boolean> {
  return todoAccess.deleteToDo(todoId)
}