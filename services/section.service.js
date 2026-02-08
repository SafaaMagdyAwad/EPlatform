import SectionModel from "../models/Section.model.js";

// Create Section
export const createSection = async (courseId, title, order) => {
  try {
    const section = await SectionModel.create({ courseId, title, order });
    return section;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get All Sections by Course
export const getSectionsByCourse = async (courseId) => {
  try {
    return await SectionModel.find({ courseId }).sort({ order: 1 });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get Single Section
export const getSectionById = async (id) => {
  try {
    return await SectionModel.findById(id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Update Section
export const updateSection = async (id, updates) => {
  try {
    const section = await SectionModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    return section;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Delete Section
export const deleteSection = async (id) => {
  try {
    await SectionModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
