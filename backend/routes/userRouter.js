import { Router } from 'express'
import { UserController } from '../controllers/userController.js'

export const createUserRouter = ({ userModel }) => {
  const usersRouter = Router()

  const userController = new UserController({ userModel })

  usersRouter.get('/', userController.getAll)
  usersRouter.post('/', userController.register)

  usersRouter.get('/:id', userController.getById)
  usersRouter.delete('/:id', userController.delete)
  usersRouter.patch('/:id', userController.update)

  return usersRouter
}
