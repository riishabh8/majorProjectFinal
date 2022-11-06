const express = require("express");
const app = express();
const db = require("./db");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();
const api = require("./api");
const port = process.env.PORT || 3001;
const database = process.env.database;
const username = process.env.username;
const password = process.env.password;
const secret = process.env.secret;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const uuid = require("uuid").v4;
const cors = require("cors");

app.use(express.json());
app.use(cors());

db.connect({ username, password, database })
  .then(() => {
    app.use(
      "/api",
      session({
        genid: (req) => {
          return uuid();
        },
        store: new MongoStore({ client: db.getClient() }),
        secret: secret,
        resave: false,
        saveUninitialized: true,
      }),
      api
    );
  })
  .catch((err) => {
    console.log(`MongoDb connection Unsuccessful ${err}`);
  });

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/", (req, res) => {});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});

module.exports = app;
