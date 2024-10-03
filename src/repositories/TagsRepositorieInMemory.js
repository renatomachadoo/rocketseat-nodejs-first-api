class TagsRepositorieInMemory{
  tags = []

  async create(tagsToInsert){
    this.tags.concat(tagsToInsert)
    return this.tags
  }
}

module.exports = TagsRepositorieInMemory