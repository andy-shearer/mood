import mongoose from "mongoose";
import logger from "./logger";
import config from "config";

async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("Database connected");
  } catch (error) {
    logger.error("Could not connect to db");
    //  for when unhandled fatal exceptions occur
    //  that was not handled by the domain
    process.exit(1);
  }
}

export default connect;
