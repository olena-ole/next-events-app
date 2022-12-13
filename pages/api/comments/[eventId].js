import { MongoClient } from 'mongodb'

const USER_NAME = 'pampam'
const PASSWORD = 'dZ5qAusaempN'
const DB_NAME = 'comments'

export default async function handler(req, res) {

    const eventId = req.query.eventId

    const client = await MongoClient.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.7olgyox.mongodb.net/events?retryWrites=true&w=majority`)

    if (req.method === 'POST') {
        const { email, name, text } = req.body

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input.'})
            return
        }

        const newComment = {
            eventId,
            email,
            name,
            text
        }

        const db = client.db()
        const result = await db.collection('comments').insertOne(newComment)

        console.log(result)

        newComment.id = result.insertedId

        res.status(201).json({ message: 'Added comment', comment: newComment})
    }

    if (req.method === 'GET') {
        const db = client.db()

        const documents = await db
            .collection('comments')
            .find()
            .sort({ _id: -1 })
            .toArray()

        res.status(200).json({ comments: documents })
    }

    client.close()
}