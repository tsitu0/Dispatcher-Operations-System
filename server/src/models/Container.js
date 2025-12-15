const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema(
  {
    containerNumber: { type: String, trim: true },
    caseNumber: { type: String, required: true, trim: true },
    mblNumber: String,
    size: String,
    terminal: String,
    deliveryAddressCompany: String,
    weight: Number,
    lfd: String,
    eta: String,
    billingParty: String,
    demurrage: String,
    inputPerson: String,
    appointmentTime: String,
    deliveryAppointment: String,
    emptyStatus: String,
    rtLocEmptyApp: String,
    yards: String,
    puDriver: String,
    notes: String,
    driverId: String,
    chassisId: String,
    orderIndex: { type: Number, default: Number.MAX_SAFE_INTEGER },
    createdAt: { type: Date, default: Date.now }
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

module.exports = mongoose.model('Container', containerSchema);
