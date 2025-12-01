import User from '../models/User.js';

// @desc    Get all users (excluding current user)
// @route   GET /api/users
// @access  Private
export const getAllUsers = async (req, res) => {
  try {
    console.log('===== GET ALL USERS =====');
    console.log('Current User ID:', req.user._id);
    console.log('Current User Name:', req.user.name);
    
    const users = await User.find({ 
      isActive: true,
      _id: { $ne: req.user._id } // Exclude current user
    })
      .select('-password')
      .populate('skillsToTeach skillsToLearn')
      .sort({ createdAt: -1 });
    
    console.log('Total users found (excluding self):', users.length);
    console.log('User names:', users.map(u => u.name).join(', '));
    
    res.json(users);
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res) => {
  try {
    console.log('===== GET USER BY ID =====');
    console.log('Requested User ID:', req.params.id);
    
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('skillsToTeach skillsToLearn');
    
    if (user) {
      console.log('User found:', user.name);
      res.json(user);
    } else {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get User By ID Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    console.log('===== UPDATE PROFILE START =====');
    console.log('User ID:', req.user._id);
    console.log('User Name:', req.user.name);
    console.log('Request Body:', req.body);
    
    const userId = req.user._id;
    const { name, bio, location, avatar, skillsToTeach, skillsToLearn } = req.body;

    // Build update object
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (location !== undefined) updateData.location = location;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (skillsToTeach !== undefined) updateData.skillsToTeach = skillsToTeach;
    if (skillsToLearn !== undefined) updateData.skillsToLearn = skillsToLearn;

    console.log('Update Data:', updateData);

    // Use findByIdAndUpdate to avoid triggering password hash
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { 
        new: true,
        runValidators: true
      }
    )
    .select('-password')
    .populate('skillsToTeach skillsToLearn');

    if (!updatedUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated User:', updatedUser.name);
    console.log('Skills to Teach:', updatedUser.skillsToTeach?.length || 0);
    console.log('Skills to Learn:', updatedUser.skillsToLearn?.length || 0);
    console.log('===== UPDATE PROFILE SUCCESS =====');

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      avatar: updatedUser.avatar,
      location: updatedUser.location,
      credits: updatedUser.credits,
      skillsToTeach: updatedUser.skillsToTeach,
      skillsToLearn: updatedUser.skillsToLearn,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt
    });
  } catch (error) {
    console.error('===== UPDATE PROFILE ERROR =====');
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    res.status(500).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Search users (excluding current user)
// @route   GET /api/users/search
// @access  Private
export const searchUsers = async (req, res) => {
  try {
    console.log('===== SEARCH USERS =====');
    console.log('Current User ID:', req.user._id);
    console.log('Current User Name:', req.user.name);
    
    const { skill, location, search } = req.query;
    console.log('Search params:', { skill, location, search });
    
    // Base query - MUST exclude current user
    let query = { 
      isActive: true, 
      _id: { $ne: req.user._id } // NOT equal to current user
    };

    // Filter by skill (users who can teach this skill)
    if (skill) {
      query.skillsToTeach = skill;
    }
    
    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Search in name, email, or bio
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } }
      ];
    }

    console.log('MongoDB Query:', JSON.stringify(query, null, 2));

    const users = await User.find(query)
      .select('-password')
      .populate('skillsToTeach skillsToLearn')
      .limit(50)
      .sort({ createdAt: -1 });

    console.log('Users found:', users.length);
    if (users.length > 0) {
      console.log('User names:', users.map(u => u.name).join(', '));
    }
    console.log('===== SEARCH COMPLETE =====');

    res.json(users);
  } catch (error) {
    console.error('===== SEARCH USERS ERROR =====');
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete/Deactivate user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    console.log('===== DELETE USER =====');
    console.log('Target User ID:', req.params.id);
    console.log('Requesting Admin:', req.user.name);
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      console.log('Cannot delete self');
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    user.isActive = false;
    await user.save();
    
    console.log('User deactivated:', user.name);
    console.log('===== DELETE COMPLETE =====');
    
    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('===== DELETE USER ERROR =====');
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};
