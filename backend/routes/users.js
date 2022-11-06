const express = require("express");
const userCredentials = require("../models/userCredentials");
const router = express.Router();
const UserCredDb = require("../models/userCredentials");
const User = require("../models/users");
router.use(express.json());
const auth = require("../middleware/auth");

router.post("/user", (req, res) => {
  const data = req.body;
  const { username, password, firstname, lastname, gmail } = data;

  UserCredDb.findOne({ username: username }).then((data) => {
    if (data) {
      res.status(200).send();
    }
  });

  const credentials = new UserCredDb({
    username: username,
    password: password,
  });
  credentials.save().then(() => {
    UserCredDb.findOne({ username: username })
      .then((data) => {
        const userId = data._id;
        //console.log(userId);
        const newEntry = new User({
          id: userId,
          username: username,
          firstname: firstname,
          lastname: lastname,
          gmail: gmail,
        });

        newEntry.save().then(() => {
          res.status(201).send();
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
});

router.put("/me", auth.authenticate, (req, res) => {
  const data = req.body;
  console.log(data);
  const { firstname, lastname, gmail } = data;

  const id = req.session.userId;

  if (!firstname) {
    if (!lastname) {
      User.findOneAndUpdate(({ id: id }, { gmail: gmail }))
        .then(() => {
          res.status(204).send("update Completed");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      User.findOneAndUpdate(({ id: id }, { gmail: gmail, lastname: lastname }))
        .then(() => {
          res.status(204).send("update Completed");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  } else if (!lastname) {
    if (!gmail) {
      User.findOneAndUpdate(({ id: id }, { firstname: firstname }))
        .then(() => {
          res.status(204).send("update Completed");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      User.findOneAndUpdate(
        ({ id: id }, { firstname: firstname, gmail: gmail })
      )
        .then(() => {
          res.status(204).send("update Completed");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  } else if (!gmail) {
    User.findOneAndUpdate(
      ({ id: id }, { firstname: firstname, lastname: lastname })
    )
      .then(() => {
        res.status(204).send("update Completed");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    User.findOneAndUpdate(
      ({ id: id }, { firstname: firstname, lastname: lastname, gmail: gmail })
    )
      .then(() => {
        res.status(204).send("update Completed");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});

router.post("/session", (req, res) => {
  const data = req.body;
  const { username, password } = data;

  userCredentials
    .findOne({ username: username })
    .then((response) => {
      if (!response) {
        res.status(401).send("User Doesnt exist").send();
      } else if (response["password"] == password) {
        req.session.userId = response["_id"];
        console.log(username);
        req.session.username = username;

        res.status(200).send("User Logged In");
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/me", (req, res) => {
  const userid = req.userId;

  User.findOne({ _id: userid })
    .then((data) => {
      if (!data) {
        res.status(401).send("User Doesnt exist");
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
