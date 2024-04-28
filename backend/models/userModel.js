import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const filePathUsers = './files/users.json';
const users = await readJSON(filePathUsers);

export class UserModel {
  static async getAll ({ username }) {
    if (username) {
      return users.filter(
        user => user.username.some(u => u.toLowerCase() === username.toLowerCase())
      )
    }
    return users
  }

  static async getById ({ id }) {
    const user = users.find(user => user.id === id)
    return user
  }

  static async register ({ input }) {
    const newUser = {
      id: randomUUID(),
      ...input
    }

    users.push(newUser)

    return newUser
  }

  static async delete ({ id }) {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    users.splice(userIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    users[userIndex] = {
      ...users[userIndex],
      ...input
    }

    return users[userIndex]
  }
}
