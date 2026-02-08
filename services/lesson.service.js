import LessonModel from "../models/Lesson.model.js";

// Create Lesson
export const createLesson = async (data) => {
  const lesson = await LessonModel.create(data);
  return lesson;
};

// Get all Lessons by Section
export const getLessonsBySection = async (sectionId) => {
  return await LessonModel.find({ sectionId }).sort({ order: 1 });
};

// Get Single Lesson
export const getLessonById = async (id) => {
  return await LessonModel.findById(id);
};

// Update Lesson
export const updateLesson = async (id, updates) => {
  const lesson = await LessonModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return lesson;
};

// Delete Lesson
export const deleteLesson = async (id) => {
  await LessonModel.findByIdAndDelete(id);
  return true;
};
