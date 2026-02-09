import liveSessionModel from "../models/liveSession.model.js";
export const createSession = async (data) => {
  try {
    console.log(data, "body data")
    const session = await liveSessionModel.create(data);
    return session;
  } catch (error) {
    throw error;
  }
}
export const getAllSessions = async () => {
  try {
    return await liveSessionModel.find()
      .populate("courseId", "title")
      .populate("instructorId", "name");
  } catch (error) {

    error.statusCode = 400;
    throw error;

  }
}
export const getSessionById = async (id) => {
  try {
    return await liveSessionModel.findById(id)
      .populate("courseId", "title")
      .populate("instructorId", "name")
      .populate("attendees", "name email");
  } catch (error) {
    throw error;
  }
}
export const joinSessionService = async (sessionId, userId) => {
  try {
    const session = await liveSessionModel.findById(sessionId);
    if (!session) throw new Error("Session not found");
    if (session.attendees.includes(userId)) throw new Error("Already joined");
    if (session.maxStudents && session.attendees.length >= session.maxStudents) {

      const error = new Error("Session is full");
      error.status = 409; 
      throw error;
    }

    session.attendees.push(userId);
    return await session.save();
  } catch (error) {
    throw error;
  }
}
export const updateSessionStatus = async (sessionId, status) => {
  try {
    return await liveSessionModel.findByIdAndUpdate(sessionId, { status }, { new: true });

  } catch (error) {
    throw error;
  }
}


