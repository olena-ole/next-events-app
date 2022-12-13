import { MongoClient } from 'mongodb'

const USER_NAME = 'pampam'
const PASSWORD = 'dZ5qAusaempN'
const DB_NAME = 'newsletter'

async function connectDatabase() {
    const client = await MongoClient.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.7olgyox.mongodb.net/newsletter?retryWrites=true&w=majority`)

    return client
}

async function insertDocument(client, document) {
    const db = client.db()

    await db.collection('emails').insertOne(document)
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' })
            return
        }

        let client

        try {
            client = await connectDatabase()
        } catch(error) {
            res.status(500).json({ message: 'Connecting to the database failed!' })
            return
        }
        
        try {
           await insertDocument(client, { email: userEmail }) 
           client.close()
        } catch(error) {
            res.status(500).json({ message: 'Inserting data failed!' })
            return
        }  

        res.status(201).json({ message: 'Signed up!' })
    }
}