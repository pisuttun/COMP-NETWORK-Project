import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.MONGODB_URI) {
  throw new Error('Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, {})
const clientPromise = client.connect()
console.log('MongoDB connected...')

export default clientPromise
