// Permissions service mock API

// register routes for API
exports.register = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send(process.env.POLICY_PATH);
  });

  app.post("/api/v1/edge/accessmap", (req, res) => {
    res.status(200).send({ path: accessMap });
  });
  
  app.post("/api/permissions", (req, res) => {
    const permission = req.body;
    const verb = permission && permission.verb;
    if (!verb) {
      res.status(500).send();
      return;
    }

    const path = (verb === 'GET' || verb === 'POST') ? '/cars' : '/cars/__id';
    if (permission.visible != null) {
      accessMap[path].verb[verb].visible = permission.visible;
    }
    if (permission.enabled != null) {
      accessMap[path].verb[verb].enabled = permission.enabled;
    }

    res.status(201).send(accessMap);
  });
}
