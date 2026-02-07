/**
 * @swagger
 * tags:
 *   name: Live
 *   description: Live classes
 */

/**
 * @swagger
 * /api/live-sessions:
 *   post:
 *     summary: Create live session
 *     tags: [Live]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Live session created
 */
app.post("/api/live-sessions", () => {});

/**
 * @swagger
 * /api/live-sessions/{id}/join:
 *   post:
 *     summary: Join live session
 *     tags: [Live]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Joined
 */
app.post("/api/live-sessions/:id/join", () => {});
