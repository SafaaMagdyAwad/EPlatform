import { createSession, getAllSessions, getSessionById, joinSessionService, updateSessionStatus } from "../services/live-session.service.js";


export const addSession = async (req, res) =>{
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
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export const getSession = async (req, res) => {
    try {
        const session = await getSessionById(req.params.id);
        if (!session) return res.status(404).json({ message: "Session not found" });
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export const joinSession = async (req, res) => {
    try {
        const session = await joinSessionService(req.params.id, req.body.userId);
        res.json(session);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
export const updateStatus = async (req, res) => {
    try {
        const session = await updateSessionStatus(req.params.id, req.body.status);
        res.json(session);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


