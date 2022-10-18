const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
    {
        id: 1,
        content: 'nota 1',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    },
    {
        id: 2,
        content: 'nota 2',
        date: '2019-05-30T17:30:31.098Z',
        important: false,
    },
    {
        id: 3,
        content: 'nota 3',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    },
]

app.get('/', (request, response) => {
    response.send('Hello world')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log({ id })
    const note = notes.find((note) => note.id === id)
    console.log({ note })

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter((note) => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note || !note.content) {
        return response.status(400).json({
            error: 'note.content is missing',
        })
    }

    const ids = notes.map((note) => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        date: new Date().toISOString(),
        important: note.important,
    }

    notes = [...notes, newNote]

    console.log(note)
    response.status(201).json(newNote)
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
