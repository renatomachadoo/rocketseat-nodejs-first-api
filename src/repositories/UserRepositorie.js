const sqliteConnection = require("../database/sqlite")

class UserRepositorie{
  async findByEmail(email){
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    return checkUserExists
  }

  async create({ name, email, password}){
    const database = await sqliteConnection()

    const userId = await database.run(
        "INSERT INTO users (name, email, password) VALUES(?,?,?)",
        [name, email, password]
    )

    return { id : userId }
  }
}

module.exports = UserRepositorie