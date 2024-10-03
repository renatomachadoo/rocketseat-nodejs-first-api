const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

const UserRepositorie = require("../repositories/UserRepositorie")
const UserCreateService = require("../services/UserCreateService")


class UsersController{
    async create(request, response){
        const {name, email, password} = request.body

        const userRepositorie = new UserRepositorie()
        const userCreateService = new UserCreateService(userRepositorie)

        await userCreateService.execute({ name, email, password})

        return response.status(201).json()
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

        if(!user){
            throw new AppError("Utilizador não encontrado.")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso.")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !old_password){
            throw new AppError("É necessário validar a password antiga para alterar a password.")
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword){
                throw new AppError("As password não coincidem.")
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user.id]
        )

        return response.json()
    }
}

module.exports = UsersController