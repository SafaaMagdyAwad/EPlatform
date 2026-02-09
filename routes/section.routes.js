import express from "express";
import {
  createSectionCtrl,
  getSectionsCtrl,
  getSectionCtrl,
  updateSectionCtrl,
  deleteSectionCtrl,
} from "../controllers/section.controller.js";
import authInstructor from "../Middlewares/authInstructor.js";

const sectionRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: Section management
 */

/**
 * @swagger
 * /api/sections:
 *   post:
 *     summary: Create a new section
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - title
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: "69888e9992fc2fce915786c4"
 *               title:
 *                 type: string
 *                 example: "Section 1"
 *               order:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     courseId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     order:
 *                       type: number
 *       401:
 *         description: No token provided or invalid token
 *       500:
 *         description: Server error
 */
sectionRouter.post("/", authInstructor, createSectionCtrl);

/**
 * @swagger
 * /api/sections/course/{courseId}:
 *   get:
 *     summary: Get all sections by course
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sections retrieved
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
 *                       courseId:
 *                         type: string
 *                       title:
 *                         type: string
 *                       order:
 *                         type: number
 *       404:
 *         description: Sections not found
 *       500:
 *         description: Server error
 */
sectionRouter.get("/course/:courseId", getSectionsCtrl);

/**
 * @swagger
 * /api/sections/{id}:
 *   get:
 *     summary: Get section by ID
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Section ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Section retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     courseId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     order:
 *                       type: number
 *       404:
 *         description: Section not found
 *       500:
 *         description: Server error
 */
sectionRouter.get("/:id", getSectionCtrl);

/**
 * @swagger
 * /api/sections/{id}:
 *   patch:
 *     summary: Update section
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Section ID
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
 *               order:
 *                 type: number
 *     responses:
 *       200:
 *         description: Section updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     courseId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     order:
 *                       type: number
 *       401:
 *         description: No token provided or invalid token
 *       404:
 *         description: Section not found
 *       500:
 *         description: Server error
 */
sectionRouter.patch("/:id", authInstructor, updateSectionCtrl);

/**
 * @swagger
 * /api/sections/{id}:
 *   delete:
 *     summary: Delete section
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Section ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Section deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: No token provided or invalid token
 *       404:
 *         description: Section not found
 *       500:
 *         description: Server error
 */
sectionRouter.delete("/:id", authInstructor, deleteSectionCtrl);

export default sectionRouter;
