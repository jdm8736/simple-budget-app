'use strict';

const express = require('express');
const router = express.Router()

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(router)
router.use(express.static(__dirname + '/dist'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
