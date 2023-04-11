import { model, Schema } from 'mongoose'
import { IChatData } from '../schema/interface'

const chatDataSchema = new Schema<IChatData>(
  {
    text: {
      type: String,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'chatData',
  },
)

export default model<IChatData>('chatData', chatDataSchema)
