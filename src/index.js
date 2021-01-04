require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.API_PORT || 9002;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// initialize policy store
require('./policy').init();

// register the permissions api handlers
const api = require('./api');
api.register(app);

app.listen(port, () => console.log(`Permissions API Server listening on port ${port}`));
