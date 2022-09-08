import { Express, Request, Response } from "express";
import { body } from "express-validator";
import { createDonationHandler } from "./controllers/donate.controller";
import {
  createVirtualAccountHandler,
  createVirtualCardHandler,
  createWalletHandler,
  getWalletBalancesHandler,
} from "./controllers/wallet.controller";

function routes(app: Express) {
  // Performance and healthcheck
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Background task
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Background task running on Google App Engine");
  });

  // Create User route
  app.post(
    "/api/donate",
    body("name", "Name is required"),
    body("organization", "Organization is required"),
    createDonationHandler
  );

  app.post("/api/wallet", createWalletHandler);

  app.post("/api/virtual_account", createVirtualAccountHandler);

  app.post("/api/card", createVirtualCardHandler);

  app.post("/api/retrieve_balance", getWalletBalancesHandler);

  // webhook for Rapyd
  app.post("/hook", (req, res) => {
    console.log(req.body); // Call your action on the request here
    res.status(200).send().end(); // Responding is important
  });
}

export default routes;
