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
 *     responses:
 *       200:
 *         description: Courses list
 */
app.get("/api/courses", () => {});

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
 *     responses:
 *       200:
 *         description: Course data
 */
app.get("/api/courses/:id", () => {});
