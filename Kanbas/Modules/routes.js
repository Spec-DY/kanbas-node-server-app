import mongoose from "mongoose";
import * as moduleDao from "./dao.js"; 

export default function ModuleRoutes(app) {

  app.put("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      const moduleId =new mongoose.Types.ObjectId(mid);
      const updatedModule = req.body;
      await moduleDao.updateModule(moduleId, updatedModule);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      const moduleId =new mongoose.Types.ObjectId(mid);
      await moduleDao.deleteModule(moduleId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const courseId =new mongoose.Types.ObjectId(cid);
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
      const courseId =new mongoose.Types.ObjectId(cid);
      const modules = await moduleDao.findModulesByCourseId(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}
