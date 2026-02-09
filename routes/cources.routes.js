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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64f8e2b1234abcd5678ef012
 *                       title:
 *                         type: string
 *                         example: "Intro to Programming"
 *                       description:
 *                         type: string
 *                         example: "Learn the basics of programming"
 *                       instructorId:
 *                         type: string
 *                         example: 64f8e2b1234abcd5678ef999
 *       401:
 *         description: No token provided or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No token provided"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
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
 *         description: Course ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course data
 *       400:
 *         description: Invalid course ID
 *       404:
 *         description: Course not found
 *       401:
 *         description: No token provided or invalid token
 *       500:
 *         description: Server error
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
 *       401:
 *         description: No token provided
 *       500:
 *         description: server Error
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
 *       400:
 *         description: invalid course id
 *       404:
 *         description: course not found
 *       401:
 *         description: No token provided
 *       500:
 *         description: server Error
 */
courseRouter.put("/:id", authInstructor, Update);

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
 *       400:
 *         description: invalid InstructorId id
 *       404:
 *         description: cources not found
 *       500:
 *         description: Server error
 */
courseRouter.get("/instructor/:id", getInstructorCources);

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
 *       400:
 *         description: invalid course id
 *       404:
 *         description: course not found
 *       401:
 *         description: No token provided
 *       500:
 *         description: server Error
 */
courseRouter.delete("/:id", authInstructor, deleteOne);




export default courseRouter;
