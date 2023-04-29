/* eslint-disable turbo/no-undeclared-env-vars */
import { Request, Response, NextFunction } from 'express'
import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import { IClient } from '../database/schema/interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any // TODO: Update User with the appropriate type
    }
  }
}

// check that the socketId is logged in
export const protectedSocketRoute = async (io: Server, socket: Socket): Promise<IClient> => {
  try {
    const client = await clientModel.find({ socketId: socket.id })
    // duplicate socketId, should not happen
    if (client.length > 1) {
      console.log('duplicate socketId')
      throw new Error('duplicate socketId')
    }
    // not logged in
    if (client.length === 0) {
      console.log('not logged in')
      throw new Error('authentification failed')
    }
    return client[0]
  } catch (error) {
    throw new Error('authentification failed')
  }
}

export const protectRESTRoute = async (req: Request, res: Response, next: NextFunction) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1]
  }

  // Make sure token exists
  if (!token || token === 'null') {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' })
  }
  try {
    // Verify token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload

    console.log('test decoded: ', decoded)
    console.log('test decoded id: ', decoded.id)

    req.user = await clientModel.findById(decoded.id)

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' })
  }
}
