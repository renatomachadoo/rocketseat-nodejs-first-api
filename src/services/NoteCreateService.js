class NoteCreateService{
  constructor({ notesRepositorie, linksRepositorie, tagsRepositorie }){
    this.notesRepositorie = notesRepositorie
    this.linksRepositorie = linksRepositorie
    this.tagsRepositorie = tagsRepositorie
  }

  async execute({ title, description, tags, links, user_id }){
    const note_id = await this.notesRepositorie.create({ title, description, user_id})

    const linksInsert = links.map(link => {
        return {
            note_id,
            url: link,
        }
    })

    await this.linksRepositorie.create(linksInsert)

    const tagsInsert = tags.map(name => {
        return {
            note_id,
            name,
            user_id,
        }
    })

    await this.tagsRepositorie.create(tagsInsert)
  }
}

module.exports = NoteCreateService