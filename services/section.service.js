import SectionModel from "../models/Section.model.js";

// Create Section
export const createSection = async (courseId, title, order) => {
  const section = await SectionModel.create({ courseId, title, order });
  return section;
};

// Get All Sections by Course
export const getSectionsByCourse = async (courseId) => {
  return await SectionModel.find({ courseId }).sort({ order: 1 });
};

// Get Single Section
export const getSectionById = async (id) => {
  return await SectionModel.findById(id);
};

// Update Section
export const updateSection = async (id, updates) => {
  const section = await SectionModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return section;
};

// Delete Section
export const deleteSection = async (id) => {
  await SectionModel.findByIdAndDelete(id);
  return true;
};
