import CourseModel from "../models/Course.model.js";

export const getAllCourses = async () => {
  return await CourseModel.find();
};

export const getCourseById = async (id) => {
  return await CourseModel.findById(id);
};

export const createCourse = async (data) => {
  return await CourseModel.create(data);
};

export const updateCourse = async (id, data) => {
  return await CourseModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourse = async (id) => {
  return await CourseModel.findByIdAndDelete(id);
};
