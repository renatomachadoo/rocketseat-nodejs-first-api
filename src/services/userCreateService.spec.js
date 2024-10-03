const UserCreateService = require("./UserCreateService")
const UserRepositorieInMemory = require("../repositories/UserRepositorieInMemory")
const AppError = require("../utils/AppError")

describe("UserCreateService", () => {
  let userRepositorieInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositorieInMemory = new UserRepositorieInMemory()
    userCreateService = new UserCreateService(userRepositorieInMemory)
  })

  it("user should be created", async () => {
    const user = {
      name : "User Test",
      email : "user@test.com",
      password : "123"
    }
  
    const userCreated = await userCreateService.execute(user)
  
    expect(userCreated).toHaveProperty("id")
  })

  it("user should not be created with email thats already in use", async () => {
    const user1 = {
      name: "user test 1",
      email : "user@test.com",
      password : "123"
    }

    const user2 = {
      name: "user test 2",
      email : "user@test.com",
      password : "456"
    }
  
    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."))
  })
})

