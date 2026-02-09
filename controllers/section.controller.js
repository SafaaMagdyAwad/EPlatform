import {
  createSection,
  getSectionsByCourse,
  getSectionById,
  updateSection,
  deleteSection,
} from "../services/section.service.js";

export const createSectionCtrl = async (req, res) => {
  try {
    const { courseId, title, order } = req.body;
    const section = await createSection(courseId, title, order);
    res.status(201).json({ message: "Section created", section });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSectionsCtrl = async (req, res) => {
  try {
    const { courseId } = req.params;
    const sections = await getSectionsByCourse(courseId);
    if(!sections){
      res.status(404).json({message:'sections not found'})
    }
    res.status(200).json({ sections });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSectionCtrl = async (req, res) => {
  try {
    const section = await getSectionById(req.params.id);
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.status(200).json({ section });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSectionCtrl = async (req, res) => {
  try {
    const section = await updateSection(req.params.id, req.body);
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.status(200).json({ message: "Section updated", section });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSectionCtrl = async (req, res) => {
  try {
    const section=await deleteSection(req.params.id);
    if(!section){
      res.status(404).json({message:'Section Not found'})
    }
    res.status(200).json({ message: "Section deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
