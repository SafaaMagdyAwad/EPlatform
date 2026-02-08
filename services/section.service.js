import SectionModel from "../models/Section.model.js";

// Create Section
export const createSection = async (courseId, title, order) => {
  try{
    const section = await SectionModel.create({ courseId, title, order });
  return section;
  }catch (error) {
   
    throw error;
  }
};

// Get All Sections by Course
export const getSectionsByCourse = async (courseId) => {
try{
    return await SectionModel.find({ courseId }).sort({ order: 1 });

}catch (error) {
   
    throw error;
  }
};

// Get Single Section
export const getSectionById = async (id) => {
try{
    return await SectionModel.findById(id);
}catch (error) {
   
    throw error;
  }
};

// Update Section
export const updateSection = async (id, updates) => {
  try{
    const section = await SectionModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return section;
  }catch (error) {
   
    throw error;
  }
};

// Delete Section
export const deleteSection = async (id) => {
  try{
    await SectionModel.findByIdAndDelete(id);
  return true;
  }catch (error) {
   
    throw error;
  }
};
