class LinksRepositorie {
  links = []
  async create(linksToInsert){
    this.links.concat(linksToInsert)
    return this.links
  }
}

module.exports = LinksRepositorie