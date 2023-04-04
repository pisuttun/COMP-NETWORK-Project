import { model, Schema } from 'mongoose'
import { IGroup } from '../schema/interface'

const groupSchema = new Schema<IGroup>(
  {
    groupName: {
      type: String,
      required: true,
    },
    clientId: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'groups',
  },
)

export default model<IGroup>('groups', groupSchema)
