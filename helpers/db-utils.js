import { MongoClient } from 'mongodb'

const USER_NAME = 'pampam'
const PASSWORD = 'dZ5qAusaempN'


export async function connectDatabase(dbFolder) {
    const client = await MongoClient.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.7olgyox.mongodb.net/${dbFolder}?retryWrites=true&w=majority`)

    return client
}

export async function insertDocument(client, collection, document) {
    const db = client.db()

    const result = await db.collection(collection).insertOne(document)

    return result
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
    const db = client.db()

    const documents = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray()

    return documents
}