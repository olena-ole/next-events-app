import fs from 'fs'
import path from 'path'

function buildPath() {
    return path.join(process.cwd(), 'data', 'comments.json')
}

function extractData(path) {
    const fileData = fs.readFileSync(path)
    const data = JSON.parse(fileData)
    return data
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        const eventId = req.query.eventId

        const email = req.body.email
        const name = req.body.name
        const text = req.body.text

        const newComment = {
            id: new Date().toISOString(),
            email: email,
            name: name,
            text: text
        }
        

        const filePath = buildPath()
        const data = extractData(filePath)

        const selectedEvent = data.find(event => event.eventId === eventId)
        selectedEvent.comments.push(newComment)

        const editedData = data.map(event => {
            if (event.eventId === eventId) {
                return selectedEvent
            } else {
                return event
            }
        })

        fs.writeFileSync(filePath, JSON.stringify(editedData))
        res.status(201).json({message: 'Success!', comment: newComment})
    } else {
        const eventId = req.query.eventId

        const filePath = buildPath()
        const data = extractData(filePath)

        const selectedEvent = data.find(event => event.eventId === eventId)
        res.status(200).json({comments: selectedEvent.comments})
    }
}