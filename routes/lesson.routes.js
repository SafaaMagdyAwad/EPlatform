import express from "express";
import {
  createLessonCtrl,
  getLessonsCtrl,
  getLessonCtrl,
  updateLessonCtrl,
  deleteLessonCtrl,
} from "../controllers/lesson.controller.js";
import authInstructor from "../Middlewares/authInstructor.js";

const lessonRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lesson management
 */

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sectionId
 *               - type
 *               - title
 *             properties:
 *               sectionId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [video, file, live]
 *               title:
 *                 type: string
 *               contentUrl:
 *                 type: string
 *               duration:
 *                 type: number
 *               order:
 *                 type: number
 *               isFreePreview:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       401:
 *         description: No token provided"
 *       500:
 *         description: Server error
 */
lessonRouter.post("/", authInstructor, createLessonCtrl);

/**
 * @swagger
 * /api/lessons/section/{sectionId}:
 *   get:
 *     summary: Get all lessons in a section
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lessons retrieved successfully
 *       500:
 *         description: Server error
 */
lessonRouter.get("/section/:sectionId", getLessonsCtrl);

/**
 * @swagger
 * /api/lessons/{id}:
 *   get:
 *     summary: Get lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson retrieved successfully
 *       404:
 *         description: Lesson not found
 */
lessonRouter.get("/:id", getLessonCtrl);

/**
 * @swagger
 * /api/lessons/{id}:
 *   patch:
 *     summary: Update lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [video, file, live]
 *               contentUrl:
 *                 type: string
 *               duration:
 *                 type: number
 *               order:
 *                 type: number
 *               isFreePreview:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       401:
 *         description: No token provided"
 *       500:
 *         description: server Error
 *       404:
 *         description: Lesson not found
 *       500:
 *         description: Server error
 */
lessonRouter.patch("/:id", authInstructor, updateLessonCtrl);

/**
 * @swagger
 * /api/lessons/{id}:
 *   delete:
 *     summary: Delete lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       401:
 *         description: No token provided
 *       500:
 *         description: Server error
 */
lessonRouter.delete("/:id", authInstructor, deleteLessonCtrl);

export default lessonRouter;
