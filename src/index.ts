import express, { Request, Response, Application } from "express";

const app: Application = express();
const port = 3000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js!");
});

const server = app.listen(port, (): void => {
  console.log(`Server Running here 👉 https://localhost:${port}`);
});
