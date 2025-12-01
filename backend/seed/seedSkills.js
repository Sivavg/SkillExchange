import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Skill from '../models/Skill.js';

dotenv.config();

const skills = [
  // Programming
  { name: 'React.js', category: 'Programming', description: 'Frontend JavaScript library', isApproved: true },
  { name: 'Node.js', category: 'Programming', description: 'Backend JavaScript runtime', isApproved: true },
  { name: 'Python', category: 'Programming', description: 'General purpose programming', isApproved: true },
  { name: 'JavaScript', category: 'Programming', description: 'Web programming language', isApproved: true },
  { name: 'Java', category: 'Programming', description: 'Object-oriented programming', isApproved: true },
  { name: 'MongoDB', category: 'Programming', description: 'NoSQL database', isApproved: true },
  { name: 'MySQL', category: 'Programming', description: 'SQL database', isApproved: true },
  { name: 'React Native', category: 'Programming', description: 'Mobile app development', isApproved: true },
  
  // Design
  { name: 'UI/UX Design', category: 'Design', description: 'User interface design', isApproved: true },
  { name: 'Figma', category: 'Design', description: 'Design tool', isApproved: true },
  { name: 'Photoshop', category: 'Design', description: 'Photo editing', isApproved: true },
  { name: 'Illustrator', category: 'Design', description: 'Vector graphics', isApproved: true },
  { name: 'Graphic Design', category: 'Design', description: 'Visual design', isApproved: true },
  
  // Business
  { name: 'Excel', category: 'Business', description: 'Spreadsheet software', isApproved: true },
  { name: 'Project Management', category: 'Business', description: 'Managing projects', isApproved: true },
  { name: 'Business Analysis', category: 'Business', description: 'Analyzing business needs', isApproved: true },
  { name: 'Financial Planning', category: 'Business', description: 'Financial management', isApproved: true },
  
  // Marketing
  { name: 'Digital Marketing', category: 'Marketing', description: 'Online marketing', isApproved: true },
  { name: 'SEO', category: 'Marketing', description: 'Search engine optimization', isApproved: true },
  { name: 'Social Media Marketing', category: 'Marketing', description: 'Social media strategy', isApproved: true },
  { name: 'Content Writing', category: 'Marketing', description: 'Writing content', isApproved: true },
  
  // Language
  { name: 'English', category: 'Language', description: 'English language', isApproved: true },
  { name: 'Spanish', category: 'Language', description: 'Spanish language', isApproved: true },
  { name: 'French', category: 'Language', description: 'French language', isApproved: true },
  { name: 'German', category: 'Language', description: 'German language', isApproved: true },
  { name: 'Tamil', category: 'Language', description: 'Tamil language', isApproved: true },
  { name: 'Hindi', category: 'Language', description: 'Hindi language', isApproved: true },
  
  // Music
  { name: 'Guitar', category: 'Music', description: 'Playing guitar', isApproved: true },
  { name: 'Piano', category: 'Music', description: 'Playing piano', isApproved: true },
  { name: 'Singing', category: 'Music', description: 'Vocal training', isApproved: true },
  { name: 'Music Production', category: 'Music', description: 'Producing music', isApproved: true },
  
  // Other
  { name: 'Photography', category: 'Other', description: 'Taking photos', isApproved: true },
  { name: 'Video Editing', category: 'Other', description: 'Editing videos', isApproved: true },
  { name: 'Cooking', category: 'Other', description: 'Culinary skills', isApproved: true },
  { name: 'Yoga', category: 'Other', description: 'Yoga practice', isApproved: true },
  { name: 'Public Speaking', category: 'Other', description: 'Speaking skills', isApproved: true }
];

const seedSkills = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing skills
    await Skill.deleteMany({});
    console.log('Cleared existing skills');

    // Insert new skills
    await Skill.insertMany(skills);
    console.log(`${skills.length} skills added successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding skills:', error);
    process.exit(1);
  }
};

seedSkills();
