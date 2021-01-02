# policyservice-mock

Mock API service that manipulates policy files in a directory.

Use with [Admin Console Sample](https://github.com/aserto-demo/admin-console-sample) to mock the Aserto permissions service.  In that project, set the key in `auth_config` to ` "policyServiceUrl": "http://localhost:9002" ` (or whatever port you override).


## install

`npm install`

## run

`npm start` will run on the default port - 9002.

`API_PORT=9003 node src/index.js` overrides the port.

Alternatively, this service uses a `.env` file to set the environment.  You can copy the `.env.example` file to `.env` and overide `API_PORT` or `POLICY_PATH`.

This mock service expects calls from localhost:3000 (as the CORS origin).
