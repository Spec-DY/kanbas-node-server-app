
const module = {
    id: 1,
    name: "Introduction to Node.js",
    description: "Backend learning course",
    course: "Web Development"
  };
  
  export default function Module(app) {
    app.get('/lab5/module', (req, res) => {
      res.json(module);
    });
  
    app.get('/lab5/module/name', (req, res) => {
      res.send(module.name);
    });
  
    // update module name
    app.get('/lab5/module/name/:newName', (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });
  
    // update module description
    app.get('/lab5/module/description/:newDescription', (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    });
  }
  