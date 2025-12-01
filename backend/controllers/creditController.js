import Credit from '../models/Credit.js';
import User from '../models/User.js';

export const getMyCreditHistory = async (req, res) => {
  try {
    const credits = await Credit.find({ user: req.user._id })
      .populate('relatedMatch')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(credits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCredits = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('credits');
    res.json({ credits: user.credits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addBonusCredits = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.credits += amount;
    await user.save();

    const creditLog = await Credit.create({
      user: userId,
      amount,
      type: 'bonus',
      description: description || 'Bonus credits from admin',
      balanceAfter: user.credits
    });

    res.json(creditLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
