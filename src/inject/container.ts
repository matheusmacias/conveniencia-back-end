import "reflect-metadata";
import { Container } from "inversify";
import UserController from "../controllers/user.controller";
import DoorController from "../controllers/door.controller";
import UserRouter from "../routes/user.router";
import DoorRouter from "../routes/door.router";
import Routes from "../routes/_routes";

const container = new Container();

container.bind<UserController>(UserController).toSelf();
container.bind<DoorController>(DoorController).toSelf();
container.bind<UserRouter>(UserRouter).toSelf();
container.bind<DoorRouter>(DoorRouter).toSelf();
container.bind<Routes>(Routes).toSelf();

export default container;
