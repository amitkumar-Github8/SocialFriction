import { Schema, model } from 'mongoose';

const habitSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  habitName: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    default: '',
  },
});

const Habit = model('Habit', habitSchema);

export default Habit;