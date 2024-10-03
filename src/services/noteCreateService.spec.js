const NoteCreateService = require("./NoteCreateService")
const NotesRepositorieInMemory = require("../repositories/NotesRepositorieInMemory")
const LinksRepositorieInMemory = require("../repositories/LinksRepositorieInMemory")
const TagsRepositorieInMemory = require("../repositories/TagsRepositorieInMemory")

describe("NoteCreateService", () => {
  it("should create a new note with links and tags", async () => {
    const newNote = {
      title : "Test note",
      description : "Test description",
      tags : ["test", "test2", "test3"],
      links : ["link1", "link2", "link3"],
      user_id : 1
    }

    const notesRepositorieInMemory = new NotesRepositorieInMemory()
    const linksRepositorieInMemory = new LinksRepositorieInMemory()
    const tagsRepositorieInMemory = new TagsRepositorieInMemory()
    const noteCreateService = new NoteCreateService({ notesRepositorie : notesRepositorieInMemory, linksRepositorie : linksRepositorieInMemory, tagsRepositorie : tagsRepositorieInMemory})

    const noteId = await noteCreateService.execute(newNote)

    expect(noteId).toBeGreaterThanOrEqual(0)
  })
})