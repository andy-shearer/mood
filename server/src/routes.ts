import { Response, Request, Express } from "express";
import createContactHandler from "./controllers/contact.controller";
import { body } from "express-validator";
import { googleOauthHandler } from "./controllers/session.controller";

import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  // Performance & healthCheck
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // OAuth
  app.get("/api/sessions/oauth/google", googleOauthHandler);

  // Collect user contact details
  app.get(
    "/api/contact/",
    [requireUser, body("mobile").isEmpty(), body("social").isEmpty()],
    createContactHandler
  );
}

export default routes;
