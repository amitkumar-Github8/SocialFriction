import mongoose, { Document, Schema } from 'mongoose';

export interface IStreak extends Document {
  user: mongoose.Types.ObjectId;
  platform: string;
  currentStreak: number;
  longestStreak: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StreakSchema = new Schema<IStreak>(
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
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create compound index for user and platform to optimize queries
StreakSchema.index({ user: 1, platform: 1 }, { unique: true });

export default mongoose.models.Streak || mongoose.model<IStreak>('Streak', StreakSchema);
