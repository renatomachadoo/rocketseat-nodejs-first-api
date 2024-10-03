const AppError = require("../utils/AppError")
const { hash } = require("bcryptjs")

class UserCreateService{
  constructor(userRepositorie){
    this.userRepositorie = userRepositorie
  }

  async execute({ name, email, password}){
        
      const checkUserExists = await this.userRepositorie.findByEmail(email)

      if(checkUserExists){
        throw new AppError("Este e-mail já está em uso.")
      }

      const hashedPassword = await hash(password, 8)

      const userCreated = await this.userRepositorie.create({ name, email, password : hashedPassword})
      
      return userCreated
    }
}

module.exports = UserCreateService