const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Fikir = require("./models/Fikir");
const Admin = require("./models/Admin");
const Referans = require("./models/Referans");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://deneme:deneme123@cluster1.gm4dn.mongodb.net/iletFikir?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) throw err;
    console.log("bağlantı başarılı");
  }
);

//Admin kayıt için gerekli kısım
app.post("/kayitOl", (req, res) => {
  const { username, password, referans } = req.body;
  const id = crypto.randomBytes(2).toString("hex");

  Referans.findOne({ referans }).then((data) => {
    if (data) {
      Admin.create({ username, password ,referans}, (err) => {
        if (err) {
          res.sendStatus(400).end();
        }
        res.status(200).send(id).end();
        if (data.referans !== "deneme") {
          Referans.findOneAndRemove({ referans }, function (err) {
            console.log(err);
          });
        }
        Referans.create({ referans: id }, (err) => {
          console.log(err);
        });
      });
    } else {
      res.sendStatus(404).end();
    }
  });
});

app.post("/giris", async (req, res) => {
  const { username, password } = req.body;
  const temp = await Admin.findOne({ username });

  if (!temp) {
    console.log("kullanıcı kayıtlı değil");
    res.status(404).end();
  } else {
    if (password !== temp.password) {
      console.log("şifre veya kullanıcı adı hatalı");
      res.status(400).end();
    }
    res.status(200).end();
  }
});

app.get("/fikirler", (req, res) => {
  Fikir.find().then((doc) => {
    res.send(doc).end();
  });
});

app.post("/fikirkaydet", (req, res) => {
  const { tamIsım, emailAdres, fikirTuru, fikir } = req.body;
  Fikir.create(
    {
      tamIsım,
      emailAdres,
      fikirTuru,
      fikir,
    },
    (err) => {
      if (err) {
        res.sendStatus(400);
      }
      res.sendStatus(200);
    }
  );
});

app.listen(3001);
