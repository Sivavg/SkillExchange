import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    skillOffered: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true
    },
    skillRequested: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
      default: 'pending'
    },
    message: {
      type: String,
      maxlength: 300
    },
    sessionDate: {
      type: Date
    },
    sessionDuration: {
      type: Number,
      default: 60
    },
    roomId: {
      type: String
    },
    rating: {
      requesterRating: { type: Number, min: 1, max: 5 },
      receiverRating: { type: Number, min: 1, max: 5 }
    },
    feedback: {
      requesterFeedback: String,
      receiverFeedback: String
    }
  },
  { timestamps: true }
);

const Match = mongoose.model('Match', matchSchema);

export default Match;
