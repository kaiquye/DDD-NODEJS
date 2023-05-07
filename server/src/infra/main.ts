import "reflect-metadata";
import * as dotenv from "dotenv";
import "./container/repository-container";
import "./container/use-cases-container";

dotenv.config();
import express from "express";
import appRoutes from "./http/routes/app-routes";
import { GlobalFilterError } from "./http/error/filters/custom-error-filter";

const server = express();
server.use(express.json());
server.use(appRoutes);
server.use(GlobalFilterError);
server.listen(4000, () => console.log("server listening..."));
