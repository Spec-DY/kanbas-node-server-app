import mongoose from "mongoose";
import * as moduleDao from "./dao.js"; 

export default function ModuleRoutes(app) {

  app.put("/api/courses/:cid/modules/:mid", async (req, res) => {
    try {
      const { cid, mid } = req.params;
      const moduleId = new mongoose.Types.ObjectId(mid);  // 这里应该是 ObjectId
      const updatedModule = req.body;
  
      console.log("Updating module with ID:", moduleId);  // 打印调试信息
      await moduleDao.updateModule(moduleId, updatedModule);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error updating module:", error.message);
      res.status(500).send(error.message);
    }
  });
  

  app.delete("/api/courses/:cid/modules/:mid", async (req, res) => {
    try {
      const { cid, mid } = req.params;
      const moduleId = new mongoose.Types.ObjectId(mid);
      const result = await moduleDao.deleteModule(moduleId);
      
      if (result.deletedCount === 0) {
        return res.status(404).send("Module not found");
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).send(error.message);
    }
  });
  

  app.post("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const courseId = new mongoose.Types.ObjectId(cid);
      const newModule = {
        ...req.body,
        course: courseId
      };
      const createdModule = await moduleDao.createModule(newModule);
      res.send(createdModule);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const courseId = new mongoose.Types.ObjectId(cid);
      const modules = await moduleDao.findModulesByCourseId(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}
