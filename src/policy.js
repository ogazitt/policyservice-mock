const fs = require('fs');

const applications = {};

exports.init = () => {
  const apps = fs.readdirSync(process.env.POLICY_PATH);
  for (const app of apps) {
    applications[app] = { 
      name: app, 
      policies: {} 
    };
    const policyPath = `${process.env.POLICY_PATH}${app}`;
    getPolicy(policyPath, app, '/');
  }
}

exports.applications = () => {
  const apps = [];
  for (const app of Object.keys(applications)) {
    apps.push(applications[app].name);
  }
  return apps;
}

exports.getPolicies = (appname) => {
  return applications[appname] && applications[appname].policies;
}

exports.updatePolicy = (appname, policyName, data) => {
  const policy = applications[appname][policyName];
  policy.data = data;
  fs.writeFileSync(policy.path, data);
}

const getPolicy = (path, appname, segment) => {
  const pols = fs.readdirSync(path, { withFileTypes: true });
  for (const polfile of pols) {
    const name = polfile.name;
    const policyName = (segment === '/') ? `/${name}` : `${segment}/${name}`;
    const policyPath = `${path}/${name}`;
    if (polfile.isDirectory()) {
      getPolicy(policyPath, appname, policyName);
    } else {
      const key = policyName.replace('.rego', '');
      applications[appname].policies[key] = { 
        name: key,
        path: policyPath,
        data: fs.readFileSync(`${path}/${name}`, 'utf8')
      }
    }
  }
}
