import express, { Request, Response, Application } from "express";

import Connections from "./connections/connections";

const app: Application = express();
const port = 3000;

app.use(express.static("src/frontend/build"));
app.use(express.json());

app.get("/persons", async (req: Request, res: Response): Promise<any> => {
  try {
    let all = await Connections.findAll();
    res.send(all);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

const server = app.listen(port, (): void => {
  console.log(`Server Running here 👉 https://localhost:${port}`);
});
