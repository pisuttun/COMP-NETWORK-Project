/* eslint-disable turbo/no-undeclared-env-vars */
import { connect } from 'mongoose'
import dotenv from 'dotenv'
//TODO: change database name to something else rather than "test"
dotenv.config()

if (!process.env.MONGODB_URI) {
  throw new Error('Missing environment variable: "MONGODB_URI"')
}
//TODO: change id to auto increment
const uri = process.env.MONGODB_URI

async function connectDatabase() {
  //TODO: add connection options if needed
  const db = await connect(uri, {})
  console.log('MongoDB connected..., to url : ', uri)
}

export default connectDatabase
