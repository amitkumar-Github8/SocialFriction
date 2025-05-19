import mongoose, { Document, Schema } from 'mongoose';

export interface IGoal extends Document {
  user: mongoose.Types.ObjectId;
  platform: string;
  targetTimePerDay: number; // in minutes
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema = new Schema<IGoal>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    platform: {
      type: String,
      required: [true, 'Please provide a platform name'],
      trim: true,
    },
    targetTimePerDay: {
      type: Number,
      required: [true, 'Please provide target time per day'],
      min: [0, 'Target time cannot be negative'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date'],
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create index for user to optimize queries
GoalSchema.index({ user: 1, isActive: 1 });

export default mongoose.model<IGoal>('Goal', GoalSchema);
