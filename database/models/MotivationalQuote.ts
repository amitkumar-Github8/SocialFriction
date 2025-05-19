import mongoose, { Document, Schema } from 'mongoose';

export interface IMotivationalQuote extends Document {
  text: string;
  author: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const MotivationalQuoteSchema = new Schema<IMotivationalQuote>(
  {
    text: {
      type: String,
      required: [true, 'Please provide quote text'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please provide an author'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
  },
  { timestamps: true }
);

// Create index for category to optimize queries
MotivationalQuoteSchema.index({ category: 1 });

export default mongoose.models.MotivationalQuote || mongoose.model<IMotivationalQuote>('MotivationalQuote', MotivationalQuoteSchema);
