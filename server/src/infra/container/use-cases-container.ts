import { container } from "tsyringe";
import { CreateManagerUseCase } from "../../application/manager/usecase/create-manager-use-case";
import { CreateTeamUseCase } from "../../application/team/create-team-use-case";
import { CreateNewMessageUseCase } from "../../application/messages/useCases/create-new-message-use-case";
import { CreateEmployeeUseCase } from "../../application/employee/usecase/create-employee-use-case";

container.registerSingleton("create-manager-use-case", CreateManagerUseCase);
container.registerSingleton("create-manager-use-case", CreateTeamUseCase);
container.registerSingleton("create-message-use-case", CreateNewMessageUseCase);
container.registerSingleton("create-employee-use-case", CreateEmployeeUseCase);
