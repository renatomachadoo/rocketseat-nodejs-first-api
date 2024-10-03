const knex = require("../database/knex")

class TagsRepositorie{
  async create(tags){
    await knex("tags").insert(tags)
  }
}

module.exports = TagsRepositorie