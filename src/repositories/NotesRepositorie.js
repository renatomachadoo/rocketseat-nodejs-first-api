const knex = require("../database/knex")

class NotesRepositorie{
  async create({ title, description, user_id}){
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    })

    return note_id
  }
}

module.exports = NotesRepositorie