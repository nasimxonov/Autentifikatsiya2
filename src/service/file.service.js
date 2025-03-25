import path from "path";
import fs from "fs";

class FileService {
  #baseRootPath = path.join(process.cwd(), "public");

  constructor() {
    if (!fs.existsSync(this.#baseRootPath)) {
      fs.mkdirSync(this.#baseRootPath, { recursive: true });
    }
  }

  saveFile(file) {
    return new Promise((resolve, reject) => {
      try {
        const randomFileName = Date.now();
        const fileExtname = path.extname(file.name);
        const filename = `${randomFileName}${fileExtname}`;
        const filePath = path.join(this.#baseRootPath, filename);

        file.mv(filePath, (err) => {
          if (err) {
            reject(new Error("Fayl yuklashda xatolik yuz berdi"));
          } else {
            resolve({
              name: file.name,
              path: `/public/${filename}`,
              size: file.size,
              type: file.mimetype,
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new FileService();
