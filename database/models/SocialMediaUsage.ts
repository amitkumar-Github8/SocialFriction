import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialMediaUsage extends Document {
  user: mongoose.Types.ObjectId;
  platform: string;
  timeSpent: number; // in minutes
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SocialMediaUsageSchema = new Schema<ISocialMediaUsage>(
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
    timeSpent: {
      type: Number,
      required: [true, 'Please provide time spent'],
      min: [0, 'Time spent cannot be negative'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create compound index for user and date to optimize queries
SocialMediaUsageSchema.index({ user: 1, date: 1 });

export default mongoose.models.SocialMediaUsage || mongoose.model<ISocialMediaUsage>('SocialMediaUsage', SocialMediaUsageSchema);
