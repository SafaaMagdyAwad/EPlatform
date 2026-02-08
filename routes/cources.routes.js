import express from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
import { create, deleteOne, getAll, getById, getInstructorCources, Update } from "../controllers/cources.controller.js";
import authInstructor from "../Middlewares/authInstructor.js";

const courseRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Courses access
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Courses list
 */
courseRouter.get("/", authMiddleware, getAll);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course details
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course data
 */
courseRouter.get("/:id", authMiddleware, getById);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - isPaid
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: "React for Beginners"
 *               isPaid:
 *                 type: boolean
 *                 example: true
 *               price:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Course created successfully
 */
courseRouter.post("/", authInstructor, create);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
courseRouter.put("/:id", authInstructor, Update);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
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
 *         description: Course deleted successfully
 */
courseRouter.delete("/:id", authInstructor, deleteOne);

/**
 * @swagger
 * /api/courses/instructor/{id}:
 *   get:
 *     summary: Anyone authonticated can  Get instructor courses
 *     tags: [Courses]
  *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Server error
 */
courseRouter.get("/instructor/:id", getInstructorCources);


export default courseRouter;
