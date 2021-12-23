import express, { Application } from "express";
import config from "./config/config";

// Express
const app = express();
const PORT: number = Number(config.port) || 3000;
// -----------------;

import http from "http";

import morgan from "morgan";

// Routes
import { getAllCurrency } from "./controllers/getAll.currency.controller";
import { postCurrency } from "./controllers/post.currency.today";
import { index } from "./controllers/index.controller";
// MongoDb
import mongoose from "mongoose";


// I must remove my password form here and put in on a .env, I will leave it so can be easier to test
// The same with the api key

mongoose.connect(
  "mongodb+srv://bigobolson:rZzGTD9mAQ2EopdZ@cluster0.0jqhu.mongodb.net/currency?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Swagger Docs

import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";
import swaggerOptions from "./utils/swaggerOptions";


const swaggerDocs = swaggerJSDoc(swaggerOptions);

console.log(swaggerDocs);

class Server {
  private app: Application;
  private readonly port: number;

  constructor(app: Application, port: number) {
    this.app = app;
    this.port = port;
    this.initializeMiddleware();
    this.initializeControllers();
  }

  private initializeMiddleware() {
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(morgan("tiny"));

    
  }

  private initializeControllers() {
    this.app.use("/getAll/?", getAllCurrency);
    this.app.use("/postCurrency", postCurrency);
    this.app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));
    this.app.use("/", index);
  }

  public run(): http.Server {
    return this.app.listen(this.port, () => {
      console.log(`Server running at port ${this.port}`);
    });
  }
}
const server = new Server(app, PORT);
server.run();
