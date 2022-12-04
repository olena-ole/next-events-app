import fs from 'fs'
import path from 'path'

function buildPath() {
    return path.join(process.cwd(), 'data', 'subscribers.json')
}

function extractData(path) {
    const fileData = fs.readFileSync(path)
    const data = JSON.parse(fileData)
    return data
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email

        const newSubscriber = {
            id: new Date().toISOString(),
            email: email
        }

        const filePath = buildPath()
        const data = extractData(filePath)
        data.push(newSubscriber)
        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).json({message: 'Success!', subscriber: newSubscriber})
    } else {
        const filePath = buildPath()
        const data = extractData(filePath)
        res.status(200).json({subscribers: data})
    }
}