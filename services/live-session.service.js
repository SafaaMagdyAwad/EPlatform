import LiveSession from "../models/liveSession.model.js";
export const createSession = async (data) => {
    const session = new LiveSession(data);
    return await session.save();
}
export const getAllSessions = async () => {
    return await LiveSession.find()
        .populate("courseId", "title")
        .populate("instructorId", "name");
}
export const getSessionById = async (id) => {
    return await LiveSession.findById(id)
        .populate("courseId", "title")
        .populate("instructorId", "name")
        .populate("attendees", "name email");
}
export const joinSessionService = async (sessionId, userId) => {
    const session = await LiveSession.findById(sessionId);
    if (!session) throw new Error("Session not found");
    if (session.attendees.includes(userId)) throw new Error("Already joined");
    if (session.maxStudents && session.attendees.length >= session.maxStudents)
        throw new Error("Session is full");

    session.attendees.push(userId);
    return await session.save();
}
export const updateSessionStatus = async (sessionId, status) => {
    return await LiveSession.findByIdAndUpdate(sessionId, { status }, { new: true });
}


