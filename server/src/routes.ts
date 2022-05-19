import { Response, Request, Express } from "express";
import {
  createContactHandler,
  getContactInfoHandler,
} from "./controllers/contact.controller";
import { body, check } from "express-validator";
import { googleOauthHandler } from "./controllers/session.controller";
import { webhookHandler } from "./controllers/webhook.controller";

import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  // Performance & healthCheck
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // OAuth
  app.get("/api/sessions/oauth/google", googleOauthHandler);

  // Create user contact details
  app.post(
    "/api/contact",
    [requireUser, check("mobile").exists(), check("social").exists()],
    createContactHandler
  );

  // Get user contact details
  app.get("/api/contact", requireUser, getContactInfoHandler);

  // Webhook handler for SMS events
  app.get("/webhook", webhookHandler);
}

export default routes;
