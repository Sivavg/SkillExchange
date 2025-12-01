import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['earned', 'spent', 'bonus', 'refund'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    relatedMatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match'
    },
    balanceAfter: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Credit = mongoose.model('Credit', creditSchema);

export default Credit;
