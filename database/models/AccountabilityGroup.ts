import mongoose, { Document, Schema } from 'mongoose';

export interface IAccountabilityGroup extends Document {
  name: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  goals: {
    platform: string;
    targetTimePerDay: number;
  }[];
  messages: {
    user: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const AccountabilityGroupSchema = new Schema<IAccountabilityGroup>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a group name'],
      trim: true,
      maxlength: [50, 'Group name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    goals: [
      {
        platform: {
          type: String,
          required: true,
          trim: true,
        },
        targetTimePerDay: {
          type: Number,
          required: true,
          min: [0, 'Target time cannot be negative'],
        },
      },
    ],
    messages: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Create indexes for efficient queries
AccountabilityGroupSchema.index({ creator: 1 });
AccountabilityGroupSchema.index({ members: 1 });

export default mongoose.models.AccountabilityGroup || mongoose.model<IAccountabilityGroup>('AccountabilityGroup', AccountabilityGroupSchema);
