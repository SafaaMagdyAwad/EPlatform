import express from "express";
import { enrollStudent, getMyProgress } from "../controllers/enrollment.controller.js";
import authStudent from "../Middlewares/authStudent.js";
const enrollmentRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: Enrollment access
 */

/**
 * @swagger
 * /api/enrollment/{courseId}/enroll:
 *   get:
 *     summary: Get course progress
 *     tags:
 *       - Enrollment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course
 *     responses:
 *       200:
 *         description: Your progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 percentage:
 *                   type: number
 *                   example: 75
 *                 currentLevel:
 *                   type: string
 *                   example: "Intermediate"
 *                 completedLessons:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["lessonId1", "lessonId2"]
 *       401:
 *         description: No token provided
 *       404:
 *         description: Student is not enrolled in this course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student is not enrolled in this course"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/enrollment/{courseId}/enroll:
 *   post:
 *     summary: Enroll in course
 *     tags:
 *       - Enrollment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course
 *     responses:
 *       201:
 *         description: Student enrolled successfully
 *       401:
 *         description: No token provided
 *       409:
 *         description: Student is already enrolled in this course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student is already enrolled in this course"
 *       500:
 *         description: Server error
 */

enrollmentRouter.post("/:id/enroll", authStudent, enrollStudent);

enrollmentRouter.get("/:id/enroll", authStudent, getMyProgress);

export default enrollmentRouter;