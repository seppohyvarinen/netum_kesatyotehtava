/*
connections.ts contains the database functions of this application. Uses mysql module and dotenv
*/

import mysql from "mysql";

import dotenv from "dotenv";

dotenv.config();

let config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

var pool = mysql.createPool(config);

/*
Connection functions that communicate with the database
*/

let Connections = {
  /**
   * This function fetches all persons that are in the database, in desired order.
   * @param sort contains data that the ordering of the list is done by.
   * @returns a promise that either rejects with a message or resolves with a list of all persons
   */
  findAll: (sort: any) =>
    new Promise<mysql.Connection>((resolve, reject) => {
      pool.query("select * from Persons order by " + sort, (err, words) => {
        if (err) {
          reject("Jokin meni vikaan haussa. Yrittäkää uudelleen");
        } else {
          resolve(words);
        }
      });
    }),

  /**
   * This function is used to add a new person to the database.
   * @param person is the new person object that is to be saved to the database.
   * @returns a promise that either rejects with a message or resolves with a message.
   */
  save: (person: { LastName: string; FirstName: string; Age: number }) =>
    new Promise((resolve, reject) => {
      console.log("inside sql query");
      var sql =
        "insert into Persons (LastName, FirstName, Age) values (" +
        pool.escape(person.LastName) +
        ", " +
        pool.escape(person.FirstName) +
        ", " +
        pool.escape(person.Age) +
        ")";
      pool.query(sql, (err) => {
        if (err) {
          reject("Jotain meni vikaan tallentamisessa");
        } else {
          resolve("Tallentaminen onnistui");
        }
      });
    }),

  /**
   * This function is used to delete a person from the database.
   * @param person contains data of the person that is to be deleted from the database.
   * @returns a promise that either rejects with a message or resolves with a message.
   */
  delete: (person: { ID: number }) =>
    new Promise((resolve, reject) => {
      pool.query(
        "delete from Persons where ID = " + pool.escape(person.ID),
        (err, Persons) => {
          if (err) {
            reject("data can't be deleted for some reason, please try again");
          }
          if (Persons.affectedRows == 0) {
            reject("Henkilöä ei löytynyt");
          } else {
            resolve("Henkilö poistettu tietokannasta");
          }
        }
      );
    }),

  /**
   * This function is used to edit a person in the database.
   * @param person contains data of the person that is to be edited.
   * @returns a promise that either rejects with a message or resolves with a message.
   */
  editPerson: (person: {
    LastName: string;
    FirstName: string;
    Age: number;
    ID: number;
  }) =>
    new Promise((resolve, reject) => {
      pool.query(
        "update Persons set LastName = " +
          pool.escape(person.LastName) +
          ", FirstName = " +
          pool.escape(person.FirstName) +
          ", Age = " +
          pool.escape(person.Age) +
          " where ID = " +
          pool.escape(person.ID),
        (err, Persons) => {
          if (err) {
            reject("Dataa ei pystytä editoimaan jostakin syystä.");
          }
          if (Persons.affectedRows == 0) {
            reject("Henkilöä ei löydy.");
          } else {
            resolve("Henkilö muokattu onnistuneesti");
          }
        }
      );
    }),
};

export default Connections;
