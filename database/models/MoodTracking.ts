import mongoose, { Document, Schema } from 'mongoose';

export interface IMoodTracking extends Document {
  user: mongoose.Types.ObjectId;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  context: 'before_usage' | 'after_usage';
  notes?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MoodTrackingSchema = new Schema<IMoodTracking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mood: {
      type: String,
      enum: ['great', 'good', 'neutral', 'bad', 'terrible'],
      required: [true, 'Please provide a mood'],
    },
    context: {
      type: String,
      enum: ['before_usage', 'after_usage'],
      required: [true, 'Please provide a context'],
    },
    notes: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create index for user to optimize queries
MoodTrackingSchema.index({ user: 1, date: -1 });

export default mongoose.models.MoodTracking || mongoose.model<IMoodTracking>('MoodTracking', MoodTrackingSchema);
