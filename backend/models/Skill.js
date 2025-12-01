import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Programming', 'Design', 'Business', 'Marketing', 'Language', 'Music', 'Other']
    },
    description: {
      type: String
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    usersCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
