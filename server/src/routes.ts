import { Response, Request, Express } from "express";

function routes(app: Express) {
  // Performance & healthCheck
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}

export default routes;
