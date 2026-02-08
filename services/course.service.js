import CourseModel from "../models/Course.model.js";

// جلب كل الكورسات
export const getAllCourses = async () => {
  try {
    return await CourseModel.find();
  } catch (e) {
    console.error("Error in getAllCourses:", e);
    throw new Error("Failed to fetch courses");
  }
};

// جلب كورسات المدرس
export const getInstructorCourses = async (instructorId) => {
  try {
    return await CourseModel.find({ instructorId });
  } catch (e) {
    console.error("Error in getInstructorCourses:", e);
    throw new Error("Failed to fetch instructor courses");
  }
};

// جلب كورس بالـ ID
export const getCourseById = async (id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid course ID");
  }
  const course = await CourseModel.findById(id);
  if (!course) throw new Error("Course not found");
  return course;
};

// إنشاء كورس جديد
export const createCourse = async (data) => {
  try {
    return await CourseModel.create(data);
  } catch (e) {
    console.error("Error in createCourse:", e);
    throw new Error("Failed to create course");
  }
};

// تعديل كورس
export const updateCourse = async (id, data) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid course ID");
  }
  const updated = await CourseModel.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Course not found");
  return updated;
};

// حذف كورس
export const deleteCourse = async (id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid course ID");
  }
  const deleted = await CourseModel.findByIdAndDelete(id);
  if (!deleted) throw new Error("Course not found");
  return deleted;
};
