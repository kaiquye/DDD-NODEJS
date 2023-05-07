import { Router } from "express";
import { managerController } from "../controller/manager-controller";
import { teamController } from "../controller/team-controller";
import { InterceptorAdapter } from "../../adapters/interceptor-http";
import { employeeController } from "../controller/employee-controller";

const appRoutes = Router();

appRoutes.post(
  "/create/manager",
  InterceptorAdapter(managerController.create.bind(managerController))
);
appRoutes.post(
  "/create/team",
  InterceptorAdapter(teamController.create.bind(teamController))
);
appRoutes.post(
  "/create/employee",
  InterceptorAdapter(employeeController.create.bind(employeeController))
);

export default appRoutes;
