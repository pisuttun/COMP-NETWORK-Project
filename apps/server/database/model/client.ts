import { model, Schema } from 'mongoose'
import { IClient, ClientStatus } from '../schema/interface'

const clientSchema = new Schema<IClient>(
  {
    //TODO: change id to auto increment
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    socketId: {
      type: String,
    },
    groupId: {
      type: [Number],
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

export default model<IClient>('Client', clientSchema)
