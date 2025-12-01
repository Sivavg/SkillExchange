import Match from '../models/Match.js';
import User from '../models/User.js';
import Credit from '../models/Credit.js';

// @desc    Create new match request
// @route   POST /api/matches
// @access  Private
export const createMatch = async (req, res) => {
  try {
    console.log('===== CREATE MATCH =====');
    console.log('Requester:', req.user.name);
    console.log('Request Body:', req.body);
    
    const { receiver, skillOffered, skillRequested, message, sessionDate } = req.body;

    // Validate that receiver exists
    const receiverUser = await User.findById(receiver);
    if (!receiverUser) {
      return res.status(404).json({ message: 'Receiver user not found' });
    }

    // Create match
    const match = await Match.create({
      requester: req.user._id,
      receiver,
      skillOffered,
      skillRequested,
      message,
      sessionDate,
      roomId: `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

    // Populate all fields
    const populatedMatch = await Match.findById(match._id)
      .populate('requester', 'name email avatar')
      .populate('receiver', 'name email avatar')
      .populate('skillOffered', 'name category')
      .populate('skillRequested', 'name category');

    console.log('Match created successfully:', populatedMatch._id);
    console.log('Room ID:', populatedMatch.roomId);
    console.log('===== CREATE MATCH COMPLETE =====');
    
    res.status(201).json(populatedMatch);
  } catch (error) {
    console.error('===== CREATE MATCH ERROR =====');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my matches
// @route   GET /api/matches/my-matches
// @access  Private
export const getMyMatches = async (req, res) => {
  try {
    console.log('===== GET MY MATCHES =====');
    console.log('User ID:', req.user._id);
    console.log('User Name:', req.user.name);
    
    const matches = await Match.find({
      $or: [
        { requester: req.user._id },
        { receiver: req.user._id }
      ]
    })
      .populate('requester', 'name email avatar credits')
      .populate('receiver', 'name email avatar credits')
      .populate('skillOffered', 'name category')
      .populate('skillRequested', 'name category')
      .sort({ createdAt: -1 });

    console.log('Matches found:', matches.length);
    
    if (matches.length > 0) {
      matches.forEach((match, index) => {
        console.log(`Match ${index + 1}: ${match.status} - ${match.skillOffered?.name} ↔ ${match.skillRequested?.name}`);
      });
    }
    
    console.log('===== GET MY MATCHES COMPLETE =====');
    res.json(matches);
  } catch (error) {
    console.error('===== GET MY MATCHES ERROR =====');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update match status
// @route   PUT /api/matches/:id/status
// @access  Private
export const updateMatchStatus = async (req, res) => {
  try {
    console.log('===== UPDATE MATCH STATUS =====');
    console.log('Match ID:', req.params.id);
    console.log('User ID:', req.user._id);
    console.log('User Name:', req.user.name);
    console.log('Request Body:', req.body);
    
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'accepted', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Find match
    const match = await Match.findById(req.params.id);

    if (!match) {
      console.log('Match not found');
      return res.status(404).json({ message: 'Match not found' });
    }

    console.log('Current Match Status:', match.status);
    console.log('New Status:', status);

    // Check authorization
    const isRequester = match.requester.toString() === req.user._id.toString();
    const isReceiver = match.receiver.toString() === req.user._id.toString();
    
    console.log('Is Requester:', isRequester);
    console.log('Is Receiver:', isReceiver);
    
    if (!isRequester && !isReceiver) {
      console.log('Not authorized - user is neither requester nor receiver');
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Handle credit transfer for completed sessions
    if (status === 'completed' && match.status !== 'completed') {
      console.log('Processing credit transfer...');
      
      try {
        // Use findByIdAndUpdate with $inc operator to avoid middleware
        const requester = await User.findByIdAndUpdate(
          match.requester,
          { $inc: { credits: -1 } },
          { new: true }
        );

        const receiver = await User.findByIdAndUpdate(
          match.receiver,
          { $inc: { credits: 1 } },
          { new: true }
        );

        if (!requester || !receiver) {
          console.log('User not found during credit transfer');
          return res.status(404).json({ message: 'User not found' });
        }

        console.log(`Credits updated successfully`);
        console.log(`Requester (${requester.name}): ${requester.credits} credits`);
        console.log(`Receiver (${receiver.name}): ${receiver.credits} credits`);

        // Create credit history records
        const creditRecords = await Credit.create([
          {
            user: match.requester,
            amount: -1,
            type: 'spent',
            description: `Completed session with ${receiver.name}`,
            relatedMatch: match._id,
            balanceAfter: requester.credits
          },
          {
            user: match.receiver,
            amount: 1,
            type: 'earned',
            description: `Completed session with ${requester.name}`,
            relatedMatch: match._id,
            balanceAfter: receiver.credits
          }
        ]);

        console.log('Credit history records created:', creditRecords.length);
      } catch (creditError) {
        console.error('Credit transfer error:', creditError);
        return res.status(500).json({ message: 'Failed to transfer credits' });
      }
    }

    // Update match status
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { $set: { status: status } },
      { new: true, runValidators: true }
    )
      .populate('requester', 'name email avatar credits')
      .populate('receiver', 'name email avatar credits')
      .populate('skillOffered', 'name category')
      .populate('skillRequested', 'name category');

    console.log('Match status updated successfully:', updatedMatch.status);
    console.log('===== UPDATE MATCH STATUS COMPLETE =====');

    res.json(updatedMatch);
  } catch (error) {
    console.error('===== UPDATE MATCH STATUS ERROR =====');
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    res.status(500).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Add rating to match
// @route   PUT /api/matches/:id/rating
// @access  Private
export const addRating = async (req, res) => {
  try {
    console.log('===== ADD RATING =====');
    console.log('Match ID:', req.params.id);
    console.log('User:', req.user.name);
    console.log('Request Body:', req.body);
    
    const { rating, feedback } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const match = await Match.findById(req.params.id);

    if (!match) {
      console.log('Match not found');
      return res.status(404).json({ message: 'Match not found' });
    }

    // Check if match is completed
    if (match.status !== 'completed') {
      return res.status(400).json({ message: 'Can only rate completed sessions' });
    }

    const isRequester = match.requester.toString() === req.user._id.toString();
    const isReceiver = match.receiver.toString() === req.user._id.toString();

    if (!isRequester && !isReceiver) {
      console.log('Not authorized');
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Build update object
    const updateData = {};
    if (isRequester) {
      updateData['rating.requesterRating'] = rating;
      if (feedback) updateData['feedback.requesterFeedback'] = feedback;
      console.log('Requester rating added');
    } else if (isReceiver) {
      updateData['rating.receiverRating'] = rating;
      if (feedback) updateData['feedback.receiverFeedback'] = feedback;
      console.log('Receiver rating added');
    }

    // Update match with rating
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('requester', 'name email avatar')
      .populate('receiver', 'name email avatar')
      .populate('skillOffered', 'name category')
      .populate('skillRequested', 'name category');

    console.log('Rating added successfully');
    console.log('===== ADD RATING COMPLETE =====');
    
    res.json(updatedMatch);
  } catch (error) {
    console.error('===== ADD RATING ERROR =====');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete match
// @route   DELETE /api/matches/:id
// @access  Private/Admin
export const deleteMatch = async (req, res) => {
  try {
    console.log('===== DELETE MATCH =====');
    console.log('Match ID:', req.params.id);
    console.log('Admin User:', req.user.name);
    
    const match = await Match.findById(req.params.id);
    
    if (!match) {
      console.log('Match not found');
      return res.status(404).json({ message: 'Match not found' });
    }

    await Match.findByIdAndDelete(req.params.id);
    
    console.log('Match deleted successfully');
    console.log('===== DELETE MATCH COMPLETE =====');
    
    res.json({ message: 'Match removed successfully' });
  } catch (error) {
    console.error('===== DELETE MATCH ERROR =====');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};
