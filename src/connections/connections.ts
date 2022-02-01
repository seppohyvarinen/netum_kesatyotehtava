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

let Connections = {
  findAll: () =>
    new Promise<mysql.Connection>((resolve, reject) => {
      pool.query("select * from Persons order by LastName", (err, words) => {
        if (err) {
          reject("Something went wrong with fetching data, please try again");
        } else {
          resolve(words);
        }
      });
    }),
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
          reject("Something went wrong with saving, please try again");
        } else {
          resolve("SAVED SUCCESFULLY: ");
        }
      });
    }),
  delete: (person: { ID: number }) =>
    new Promise((resolve, reject) => {
      pool.query(
        "delete from Persons where ID = " + pool.escape(person.ID),
        (err, Persons) => {
          if (err) {
            reject("data can't be deleted for some reason, please try again");
          }
          if (Persons.affectedRows == 0) {
            reject("No such word");
          } else {
            resolve("Deleted word succesfully");
          }
        }
      );
    }),
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
          "where ID = " +
          pool.escape(person.ID),
        (err, Persons) => {
          if (err) {
            reject("data can't be edited for some reason, please try again");
          }
          if (Persons.affectedRows == 0) {
            reject("No such word");
          } else {
            resolve("Edited word succesfully");
          }
        }
      );
    }),
};

export default Connections;
