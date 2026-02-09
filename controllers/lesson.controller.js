import {
  createLesson,
  getLessonsBySection,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "../services/lesson.service.js";

export const createLessonCtrl = async (req, res) => {
  try {
    const lesson = await createLesson(req.body);
    res.status(201).json({ message: "Lesson created", lesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLessonsCtrl = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const lessons = await getLessonsBySection(sectionId);
    if (!lessons) {
      res.status(404).json({ message: 'lessons not found' })
    }
    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLessonCtrl = async (req, res) => {
  try {
    const lesson = await getLessonById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLessonCtrl = async (req, res) => {
  try {
    const lesson = await updateLesson(req.params.id, req.body);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.status(200).json({ message: "Lesson updated", lesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLessonCtrl = async (req, res) => {
  try {
    const lesson = await deleteLesson(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.status(200).json({ message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
