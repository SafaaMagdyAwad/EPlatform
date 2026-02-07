/**
 * @swagger
 * tags:
 *   name: Instructor
 *   description: Instructor actions
 */

/**
 * @swagger
 * /api/instructor/courses:
 *   post:
 *     summary: Create course
 *     tags: [Instructor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Course created
 */
app.post("/api/instructor/courses", () => {});

/**
 * @swagger
 * /api/instructor/courses:
 *   get:
 *     summary: Get instructor courses
 *     tags: [Instructor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
 */
app.get("/api/instructor/courses", () => {});
