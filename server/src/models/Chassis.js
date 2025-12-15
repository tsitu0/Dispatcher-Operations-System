const mongoose = require('mongoose');

const chassisSchema = new mongoose.Schema(
  {
    chassisNumber: { type: String, required: true, trim: true },
    type: String,
    status: String
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
      }
    }
  }
);

module.exports = mongoose.model('Chassis', chassisSchema);
