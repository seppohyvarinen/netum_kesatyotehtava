import express, { Request, Response, Application } from "express";

import Connections from "./connections/connections";

import cors from "cors";

const app: Application = express();
const port = 3000;

app.use(cors());

app.use(express.static("src/frontend/build"));
app.use(express.json());

/**
 * Async get function that calls the database function to fetch all persons from the database.
 * When succesfull, the response containing all the persons is sent as res.send to the frontend.
 * If it fails, statuscode 404 is sent to the frontend.
 */

app.get("/persons", async (req: Request, res: Response): Promise<any> => {
  let sort = req.query.sortBy;

  try {
    let all = await Connections.findAll(sort);
    res.send(all);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

/**
 * Async post function that calls the database function to save a new person to the database.
 * When succesful, statuscode 201 is sent to the frontend.
 * If it fails, statuscode 404 is sent to the frontend.
 */

app.post("/persons", async (req: Request, res: Response): Promise<any> => {
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

/**
 * Async delete function that calls the database function to delete a person from the database.
 * When succesful, statuscode 204 is sent to the frontend.
 * If it fails, statuscode 404 is sent to the frontend.
 */
app.delete("/persons", async (req: Request, res: Response): Promise<any> => {
  let person = req.body;

  try {
    await Connections.delete(person);

    res.statusCode = 204;
    res.end();
  } catch (error) {
    res.statusCode = 404;
    res.send({ msg: error });
  }
});

/**
 * Async post function that calls the database function to edit a person in the database.
 * When succesful, statuscode 201 is sent to the frontend.
 * If it fails, statuscode 404 is sent to the frontend.
 */

app.patch("/persons", async (req: Request, res: Response): Promise<any> => {
  let person = req.body;

  console.log(person);

  try {
    var response = await Connections.editPerson(person);

    res.statusCode = 200;
    res.end();
  } catch (error) {
    res.statusCode = 404;
    res.send({ msg: error });
  }
});

const server = app.listen(port, (): void => {
  console.log(`Server Running here 👉 https://localhost:${port}`);
});
