/* eslint-disable turbo/no-undeclared-env-vars */
import { model, Schema } from 'mongoose'
import { IClient } from '../schema/interface'
import { ClientStatus } from '@chatAIP/dtos'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const clientSchema = new Schema<IClient>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 15,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      maxlength: 15,
    },
    socketId: {
      type: String,
      default: '',
    },
    groupId: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(ClientStatus),
      default: ClientStatus.AVAILABLE,
    },
    isInvisibility: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'clients',
  },
)

clientSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

clientSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: process.env.JWT_EXPIRE,
    } || {},
  )
}

clientSchema.methods.matchPassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password)
}

export default model<IClient>('clients', clientSchema)
