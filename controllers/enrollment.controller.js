import { createEnroll, getMyProgressService } from "../services/enrollment.service.js";

export const enrollStudent = async (req, res) => {
    try {
        const studentId = req.user.id;
        const courseId = req.params.id;
        console.log(studentId, "  ", courseId);

        const enrollment = await createEnroll(studentId, courseId);

        res.status(201).json({
            message: "Student enrolled successfully",
            enrollment,
        });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({
            message: error.message || "Server error",
        });
    }
};
export const getMyProgress = async (req, res) => {
    try {
        const studentId = req.user.id;
        const courseId = req.params.id;
        console.log(studentId, "  ", courseId);

        const enrollment = await getMyProgressService(studentId, courseId);

        res.status(201).json({
            message: "your progress retreved successfully",
            enrollment,
        });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({
            message: error.message || "Server error",
        });
    }
};
