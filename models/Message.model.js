const { Schema, model } = require("mongoose")

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    content: {
      type: String
    }

  },
  {
    timestamps: true
  }
)

module.exports = model('Message', messageSchema)
