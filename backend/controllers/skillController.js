import Skill from '../models/Skill.js';

export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ isApproved: true }).sort({ name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, category, description } = req.body;

    const skillExists = await Skill.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (skillExists) {
      return res.status(400).json({ message: 'Skill already exists' });
    }

    const skill = await Skill.create({
      name,
      category,
      description,
      createdBy: req.user._id,
      isApproved: req.user.role === 'admin'
    });

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      skill.name = req.body.name || skill.name;
      skill.category = req.body.category || skill.category;
      skill.description = req.body.description || skill.description;
      skill.isApproved = req.body.isApproved ?? skill.isApproved;

      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      await skill.deleteOne();
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSkillsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const skills = await Skill.find({ category, isApproved: true });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
