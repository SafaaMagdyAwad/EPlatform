import CourseModel from "../models/Course.model.js";

// جلب كل الكورسات
export const getAllCourses = async () => {
  try {
    return await CourseModel.find();
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// جلب كورسات المدرس
export const getInstructorCourses = async (instructorId) => {
  try {
    return await CourseModel.find({ instructorId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
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
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// تعديل كورس
export const updateCourse = async (id, data) => {
  try{
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid course ID");
  }
  const updated = await CourseModel.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Course not found");
  return updated;
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// حذف كورس
export const deleteCourse = async (id) => {
  try{
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid course ID");
  }
  const deleted = await CourseModel.findByIdAndDelete(id);
  if (!deleted) throw new Error("Course not found");
  return deleted;
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
