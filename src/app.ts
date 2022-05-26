import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import creatServer from "./utils/server";

const port = config.get<number>("port");

const app = creatServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
});
