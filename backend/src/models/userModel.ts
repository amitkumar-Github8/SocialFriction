import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  moodCheckIns: [{
    date: {
      type: Date,
      default: Date.now
    },
    mood: {
      type: String,
      required: true
    }
  }],
  timeBudget: {
    type: Number,
    default: 0
  },
  focusCredits: {
    type: Number,
    default: 0
  },
  habits: [{
    type: Schema.Types.ObjectId,
    ref: 'Habit'
  }]
});

const User = model('User', userSchema);

export default User;