import { Response, Request, Express } from "express";
import { googleOauthHandler } from "./controllers/session.controller";

function routes(app: Express) {
  // Performance & healthCheck
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // OAuth
  app.get("/api/sessions/oauth/google", googleOauthHandler);
}

export default routes;
