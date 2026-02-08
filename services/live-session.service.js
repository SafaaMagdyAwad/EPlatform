import LiveSession from "../models/liveSession.model.js";
export const createSession = async (data) => {
  try {
    const session = new LiveSession(data);
    return await session.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
export const getAllSessions = async () => {
  try {
    return await LiveSession.find()
      .populate("courseId", "title")
      .populate("instructorId", "name");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
export const getSessionById = async (id) => {
  try {
    return await LiveSession.findById(id)
      .populate("courseId", "title")
      .populate("instructorId", "name")
      .populate("attendees", "name email");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
export const joinSessionService = async (sessionId, userId) => {
  try {
    const session = await LiveSession.findById(sessionId);
    if (!session) throw new Error("Session not found");
    if (session.attendees.includes(userId)) throw new Error("Already joined");
    if (session.maxStudents && session.attendees.length >= session.maxStudents)
      throw new Error("Session is full");

    session.attendees.push(userId);
    return await session.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
export const updateSessionStatus = async (sessionId, status) => {
  try {
    return await LiveSession.findByIdAndUpdate(sessionId, { status }, { new: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}


