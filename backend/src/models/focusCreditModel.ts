import { Schema, model } from 'mongoose';

const focusCreditSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

focusCreditSchema.methods.addCredits = function (amount: number) {
  this.credits += amount;
  this.lastUpdated = new Date();
  return this.save();
};

focusCreditSchema.methods.deductCredits = function (amount: number) {
  if (this.credits >= amount) {
    this.credits -= amount;
    this.lastUpdated = new Date();
    return this.save();
  }
  throw new Error('Insufficient credits');
};

focusCreditSchema.methods.getCredits = function () {
  return this.credits;
};

const FocusCredit = model('FocusCredit', focusCreditSchema);

export default FocusCredit;