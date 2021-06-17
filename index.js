const express = require("express");
const app = express();
const fs = require("fs");
const pdf = require("pdf-creator-node");
const path = require("path");
// const options = require("./data/options");
// const data = require("./data/data");
const training = require("./data/training");

app.get("/", function(req, res) {
  // return res.send("Hello world");
  return res.download("./tmp/hello.txt");
});

app.get("/download", function(req, res) {
  const html = fs.readFileSync(
    path.join(__dirname, "./template/index.html"),
    "utf-8"
  );

  const filename = Math.random() + "_doc" + ".pdf";
  let array = [];

  // data.forEach(d => {
  //   const prod = {
  //     name: d.name,
  //     description: d.description,
  //     unit: d.unit,
  //     quantity: d.quantity,
  //     price: d.price,
  //     total: d.quantity * d.price,
  //     imgurl: d.imgurl
  //   };
  //   array.push(prod);
  // });

  training.forEach(d => {
    const training = {
      no: d.no,
      jenis_training: d.jenis_training,
      tanggal_training: d.jenis_trainingtanggal_training,
      berlaku_sampai: d.berlaku_sampai,
      penyelenggara: d.penyelenggara
    };
    array.push(training);
  });

  // let subtotal = 0;
  // array.forEach(i => {
  //   subtotal += i.total;
  // });
  // const tax = (subtotal * 20) / 100;
  // const grandtotal = subtotal - tax;
  const obj = {
    prodlist: array
    // subtotal: subtotal,
    // tax: tax,
    // gtotal: grandtotal
  };
  const document = {
    html: html,
    data: {
      products: obj
    },
    path: "./tmp/" + filename
  };
  var options = {
    format: "A4",
    orientation: "portrait"
  };
  pdf
    .create(document, options)
    .then(file => {
      console.log(file);
      return res.download(`./tmp/${filename}`);
    })
    .catch(error => {
      console.log(error);
      return res(error);
    });
  // const filepath = "./tmp/" + filename;
  // console.log(path);
  // return res.download(`./tmp/${filename}`);
  return true;
});

app.listen(process.env.PORT || 8080);
