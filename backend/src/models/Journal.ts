import mongoose, { Document, Schema } from 'mongoose';

export interface IJournal extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  content: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JournalSchema = new Schema<IJournal>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
      trim: true,
    },
    mood: {
      type: String,
      enum: ['great', 'good', 'neutral', 'bad', 'terrible'],
      required: [true, 'Please provide a mood'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create index for user to optimize queries
JournalSchema.index({ user: 1, date: -1 });

export default mongoose.model<IJournal>('Journal', JournalSchema);
