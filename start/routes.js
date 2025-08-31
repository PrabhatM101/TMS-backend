const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const {errorHandler} = require("../middlewares/errorHandler");
const bodyParser = require("body-parser");
const compression = require("compression");
const express = require("express");
const fs = require("fs");


const userRoute = require("../routes/user.route");
const authRoute = require("../routes/auth.route");
const taskRoute = require("../routes/task.route");




const docsDir = path.join(__dirname, "../swagger");
const swaggerDocs = fs
  .readdirSync(docsDir)
  .filter((file) => file.endsWith(".js"))
  .map((file) => require(path.join(docsDir, file)))


  const mergedDocs = swaggerDocs.reduce(
  (acc, doc) => {
    acc.tags = [...(acc.tags || []), ...(doc.tags || [])];
    acc.paths = { ...(acc.paths || {}), ...(doc.paths || {}) };
    acc.components.securitySchemes = {
      ...(acc.components.securitySchemes || {}),
      ...(doc.components?.securitySchemes || {}),
    };
    acc.components.schemas = {
      ...(acc.components.schemas || {}),
      ...(doc.components?.schemas || {}),
    };
    return acc;
  },
  { tags: [], paths: {}, components: { securitySchemes: {}, schemas: {} } }
);



module.exports = function (app,conn) {
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TMS Backend API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: process.env.BACKEND_URL || "http://localhost:3000",
      },
    ],
    ...mergedDocs,
  },
  apis: [], 
};

const specs = swaggerJSDoc(options);

  app.set("trust proxy", true);


  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    cors({
      origin: "*",
    })
  );
  
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  app.use(compression());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));



  app.use(express.static(path.join(__dirname, "../public")));

  //routes
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  app.use("/users", userRoute);
  app.use("/auth", authRoute);
  app.use("/tasks", taskRoute);
 
 
  //errorHandler
  app.use(errorHandler);
};
