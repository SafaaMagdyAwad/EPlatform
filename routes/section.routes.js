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
 *               courseId: 69888e9992fc2fce915786c4
 *                 type: string
 *               title: section 1
 *                 type: string
 *               order: 1
 *                 type: number
 *     responses:
 *       201:
 *         description: Section created successfully
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
 *         schema:
 *           type: string
 *         description: ID of the course
 *     responses:
 *       200:
 *         description: Sections retrieved
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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Section retrieved
 *       404:
 *         description: Section not found
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
 *         description: Section updated
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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Section deleted
 *       500:
 *         description: Server error
 */
sectionRouter.delete("/:id", authInstructor, deleteSectionCtrl);

export default sectionRouter;
