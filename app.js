const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const http = require("http");


const PORT = process.env.PORT || 3000;
require("./services/dbConnection.service");
const server = http.createServer(app);


require("./start/routes")(app);
require('./services/socketIo.service').init(server);

module.exports = server.listen(PORT, () => {
  console.log(`server is running on ${process.env.BACKEND_URL},  PORT:${PORT}`);
});
