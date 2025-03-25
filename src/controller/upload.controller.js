import FileService from "../service/file.service.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res
        .status(400)
        .json({ success: false, message: "Fayl topilmadi" });
    }

    const uploadedFile = await FileService.saveFile(req.files.file);

    res.json({
      success: true,
      message: "Fayl muvaffaqiyatli yuklandi",
      file: uploadedFile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
