// Permissions service mock API
const policy = require('./policy');

// register routes for API
exports.register = (app) => {
  app.get('/api/v1/applications', (req, res) => {
    res.status(200).send(policy.applications());
  });

  app.get('/api/v1/applications/:appname', (req, res) => {
    const appname = req.params.appname;
    if (!appname) {
      res.status(404).send();
    } else {
      const result = policy.getPolicies(appname);
      if (!result) {
        res.status(404).send();
      } else {
        res.status(200).send(result);
      }
    }
  });

  app.put('/api/v1/applications/:appname', (req, res) => {
    const appname = req.params.appname;
    const policyName = req.body.policy;
    const data = req.body.data;
    if (!policyName || !data) {
      res.status(404).send();
    } else {
      res.status(201).send(policy.updatePolicy(appname, policyName, data));
    }
  });
}
