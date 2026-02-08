import LessonModel from "../models/Lesson.model.js";

// Create Lesson
export const createLesson = async (data) => {
  try{
    const lesson = await LessonModel.create(data);
  return lesson;
  }catch (error) {
   
    throw error;
  }
};

// Get all Lessons by Section
export const getLessonsBySection = async (sectionId) => {
  try{
    return await LessonModel.find({ sectionId }).sort({ order: 1 });
  }catch (error) {
   
    throw error;
  }
};

// Get Single Lesson
export const getLessonById = async (id) => {
  try{
    return await LessonModel.findById(id);
  }catch (error) {
   
    throw error;
  }
};

// Update Lesson
export const updateLesson = async (id, updates) => {
  try{
    const lesson = await LessonModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return lesson;
  }catch (error) {
   
    throw error;
  }
};

// Delete Lesson
export const deleteLesson = async (id) => {
  try{
await LessonModel.findByIdAndDelete(id);
  return true;
  }catch (error) {
   
    throw error;
  }
};
