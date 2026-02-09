import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../services/course.service.js";

/**
 * Get all courses
 */
export const getAll = async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * Get instructor courses
 */
export const getInstructorCources = async (req, res) => {
  try {
    const instructorId=req.params.id;
    const courses = await InstrctorCoursesService(instructorId);
    res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get course by id
 */
export const getById = async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Create new course (Instructor only)
 */
export const create = async (req, res) => {
  try {
    const instructorId=req.user.id;
    console.log(instructorId ,"instructorId");
    req.body.instructorId=instructorId;
    console.log(req.body);
    
    const course = await createCourse(req.body);
    
    res.status(201).json({ message: "Course created", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update course (Instructor only)
 */
export const Update = async (req, res) => {
  try {
    const updated = await updateCourse(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course updated", course: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete course (Instructor only)
 */
export const deleteOne = async (req, res) => {
  try {
    const deleted = await deleteCourse(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

