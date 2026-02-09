import { createSession, getAllSessions, getSessionById, joinSessionService, updateSessionStatus } from "../services/live-session.service.js";


export const addSession = async (req, res) => {
    try {
        const session = await createSession(req.body);
        res.status(201).json(session);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
export const getSessions = async (req, res) => {
    try {
        const sessions = await getAllSessions();
        if (!sessions) return res.status(404).json({ message: "sessions not found" });
        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export const getSession = async (req, res) => {
    try {
        const session = await getSessionById(req.params.id);
        if (!session) return res.status(404).json({ message: "Session not found" });
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export const joinSession = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const session = await joinSessionService(req.params.id, userId);
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export const updateStatus = async (req, res) => {
    try {
        const session = await updateSessionStatus(req.params.id, req.body.status);
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


