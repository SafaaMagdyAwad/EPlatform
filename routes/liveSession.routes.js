import express from "express";
import { addSession, getSession, getSessions, joinSession, updateStatus } from "../controllers/live-session.controller.js";
import authInstructor from "../Middlewares/authInstructor.js";
import authMiddleware from "../Middlewares/authMiddleware.js";


const liveSessionRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: LiveSessions
 *   description: Manage live sessions
 */

/**
 * @swagger
 * /api/live-sessions:
 *   post:
 *     summary: Add new live session
 *     tags: [LiveSessions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               instructorId:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: number
 *               maxStudents:
 *                 type: number
 *     responses:
 *       201:
 *         description: Session created
 */
liveSessionRouter.post("/",  authInstructor, addSession);

/**
 * @swagger
 * /api/live-sessions:
 *   get:
 *     summary: Get all live sessions
 *     tags: [LiveSessions]
 *     responses:
 *       200:
 *         description: List of sessions
 */
liveSessionRouter.get("/", getSessions);

/**
 * @swagger
 * /api/live-sessions/{id}:
 *   get:
 *     summary: Get a single session
 *     tags: [LiveSessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session data
 */
liveSessionRouter.get("/:id", getSession);

/**
 * @swagger
 * /api/live-sessions/{id}/join:
 *   post:
 *     summary: Join a live session
 *     tags: [LiveSessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Joined successfully
 */
liveSessionRouter.post("/:id/join", authMiddleware, joinSession);

/**
 * @swagger
 * /api/live-sessions/{id}/status:
 *   patch:
 *     summary: Update session status
 *     tags: [LiveSessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [scheduled, live, ended, cancelled]
 *     responses:
 *       200:
 *         description: Status updated
 */
liveSessionRouter.patch("/:id/status", authInstructor, updateStatus);

export default liveSessionRouter;
