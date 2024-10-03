const knex = require("../database/knex")

class LinksRepositorie {
  async create(links){
    await knex("links").insert(links)
  }
}

module.exports = LinksRepositorie