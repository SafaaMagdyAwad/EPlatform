import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Learning Platform API",
      version: "1.0.0",
      description: "Full API documentation for Online Learning Platform",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      /* ===================== SCHEMAS ===================== */
      schemas: {
        /* ---------- AUTH ---------- */
        RegisterDto: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Safaa" },
            email: { type: "string", example: "test@mail.com" },
            password: { type: "string", example: "123456" },
          },
        },

        LoginDto: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "test@mail.com" },
            password: { type: "string", example: "123456" },
          },
        },

        /* ---------- USER ---------- */
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: {
              type: "string",
              enum: ["student", "instructor", "admin"],
            },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        /* ---------- COURSE ---------- */
        Course: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string", example: "Node.js Masterclass" },
            description: { type: "string" },
            instructorId: { type: "string" },
            price: { type: "number", example: 200 },
            isPaid: { type: "boolean" },
            status: {
              type: "string",
              enum: ["draft", "pending", "approved", "rejected"],
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        CreateCourseDto: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
          },
        },

        /* ---------- SECTION ---------- */
        Section: {
          type: "object",
          properties: {
            _id: { type: "string" },
            courseId: { type: "string" },
            title: { type: "string" },
            order: { type: "number" },
          },
        },

        CreateSectionDto: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string" },
            order: { type: "number" },
          },
        },

        /* ---------- LESSON ---------- */
        Lesson: {
          type: "object",
          properties: {
            _id: { type: "string" },
            sectionId: { type: "string" },
            title: { type: "string" },
            type: {
              type: "string",
              enum: ["video", "file", "live"],
            },
            contentUrl: { type: "string" },
            duration: { type: "number", example: 15 },
            isFreePreview: { type: "boolean" },
          },
        },

        CreateLessonDto: {
          type: "object",
          required: ["title", "type"],
          properties: {
            title: { type: "string" },
            type: {
              type: "string",
              enum: ["video", "file", "live"],
            },
            contentUrl: { type: "string" },
            duration: { type: "number" },
          },
        },

        /* ---------- LIVE SESSION ---------- */
        LiveSession: {
          type: "object",
          properties: {
            _id: { type: "string" },
            courseId: { type: "string" },
            instructorId: { type: "string" },
            startTime: { type: "string", format: "date-time" },
            duration: { type: "number" },
            maxStudents: { type: "number" },
            status: {
              type: "string",
              enum: ["scheduled", "live", "ended", "cancelled"],
            },
            attendees: {
              type: "array",
              items: { type: "string" },
            },
          },
        },

        CreateLiveSessionDto: {
          type: "object",
          required: ["courseId", "startTime", "duration", "maxStudents"],
          properties: {
            courseId: { type: "string" },
            startTime: { type: "string", format: "date-time" },
            duration: { type: "number" },
            maxStudents: { type: "number" },
          },
        },

        /* ---------- ENROLLMENT ---------- */
        Enrollment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            studentId: { type: "string" },
            courseId: { type: "string" },
            enrolledAt: { type: "string", format: "date-time" },
          },
        },

        /* ---------- PROGRESS ---------- */
        Progress: {
          type: "object",
          properties: {
            studentId: { type: "string" },
            courseId: { type: "string" },
            completedLessons: {
              type: "array",
              items: { type: "string" },
            },
            completionPercentage: { type: "number", example: 80 },
            lastAccessAt: { type: "string", format: "date-time" },
          },
        },

        /* ---------- NOTIFICATION ---------- */
        Notification: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            title: { type: "string" },
            message: { type: "string" },
            isRead: { type: "boolean" },
          },
        },

        /* ---------- PAYMENT ---------- */
        Payment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            courseId: { type: "string" },
            amount: { type: "number" },
            provider: {
              type: "string",
              enum: ["stripe", "paymob"],
            },
            status: {
              type: "string",
              enum: ["pending", "paid", "failed"],
            },
          },
        },
      },
    },

    security: [{ bearerAuth: [] }],
  },

  apis: ["./routes/*.js", "./index.js"],
};

export default swaggerJSDoc(swaggerOptions);
