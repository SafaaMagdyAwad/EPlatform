/**
 * @swagger
 * tags:
 *   name: Enrollment
 */

/**
 * @swagger
 * /api/courses/{id}/enroll:
 *   post:
 *     summary: Enroll in course
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Enrolled successfully
 */
app.post("/api/courses/:id/enroll", () => {});

/**
 * @swagger
 * /api/progress/course/{id}:
 *   get:
 *     summary: Get course progress
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Progress data
 */
app.get("/api/progress/course/:id", () => {});
