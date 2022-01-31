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

app.post("/", async (req: Request, res: Response): Promise<any> => {
  let tmp = req.body;

  try {
    let save = await Connections.save(tmp);
    res.statusCode = 201;
    res.send(save);
  } catch (error) {
    res.statusCode = 400;
    res.send(`${res.statusCode} Bad Request: ${error}`);
  }
});

const server = app.listen(port, (): void => {
  console.log(`Server Running here 👉 https://localhost:${port}`);
});
