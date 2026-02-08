import EnrollmentModel from "../models/Enrollment.model.js";

export const createEnroll = async (studentId, courseId) => {
  // تقدر تعمل check لو الطالب مسجل بالفعل
  const existing = await EnrollmentModel.findOne({ studentId, courseId });
  if (existing) {
    const error = new Error("Student is already enrolled in this course");
    error.statusCode = 409; // Conflict
    throw error;
  }

  const enroll = await EnrollmentModel.create({
    studentId,
    courseId,
    enrolledAt: new Date(),
  });

  return enroll;
};
export const getMyProgressService = async (studentId, courseId) => {
  // تقدر تعمل check لو الطالب مسجل بالفعل
  const enroll = await EnrollmentModel.findOne({ studentId, courseId });
  if (!enroll) {
    const error = new Error("Student is NOT enrolled in this course");
    error.statusCode = 409; // Conflict
    throw error;
  }
  console.log(enroll,"enroll");
  return enroll;
};
