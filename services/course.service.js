import CourseModel from "../models/Course.model.js";

// جلب كل الكورسات
export const getAllCourses = async () => {
  try {
    return await CourseModel.find();
  } catch (error) {
    throw error;
  }
};

// جلب كورسات المدرس
export const InstrctorCoursesService = async (instructorId) => {
  try {
     if (!instructorId.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid InstructorId ID");
    error.status = 400; // Bad Request
    throw error;
  }
    return await CourseModel.find({ instructorId });
  } catch (error) {
    throw error;
  }
};

// جلب كورس بالـ ID

export const getCourseById = async (id) => {
  // التحقق من شكل الـ ObjectId
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid course ID");
    error.status = 400; // Bad Request
    throw error;
  }
  const course = await CourseModel.findById(id);
  return course;
};


// إنشاء كورس جديد
export const createCourse = async (data) => {
  try {
    return await CourseModel.create(data);
  } catch (error) {
    throw error;
  }
};

// تعديل كورس
export const updateCourse = async (id, data) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      const error = new Error("Invalid course ID");
      error.status = 400; // Bad Request
      throw error;
    }
    const updated = await CourseModel.findByIdAndUpdate(id, data, { new: true });
    return updated;
  } catch (error) {
    throw error;
  }
};

// حذف كورس
export const deleteCourse = async (id) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      const error = new Error("Invalid course ID");
      error.status = 400; // Bad Request
      throw error;
    }
    const deleted = await CourseModel.findByIdAndDelete(id);
    if (!deleted) {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        const error = new Error("Course not found");
        error.status = 404; // Bad Request
        throw error;
      }
    };
    return deleted;
  } catch (error) {
    throw error;
  }
};
