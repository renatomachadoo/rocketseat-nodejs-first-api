class NotesRepositorieInMemory{
  notes = []

  async create({ title, description, user_id}){
    const note = {
      id : Math.floor(Math.random() * 1000) + 1,
      title,
      description,
      user_id
    }

    this.notes.push(note)

    return note.id
  }
}

module.exports = NotesRepositorieInMemory