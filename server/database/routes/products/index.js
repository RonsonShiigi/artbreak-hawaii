const express = require("express");
const router = express.Router();
const Product = require("../../models/ProductsModel.js");

const AWS = require("aws-sdk");
const multer = require("multer");
const multer3 = require("multer-s3");

const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");

//set up AWS environment
AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multer3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldname: "TestPicture" });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.AWS_BUCKET_NAME,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

router
  .route("/")
  // GET PRODUCT
  .get((req, res) => {
    console.log("This is the GET /Products!!");
    return new req.database.Product()
      .fetchAll()
      .then(products => {
        console.log("products", products);
        return res.json(products);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  // .post((req, res) => {
  //   console.log("backend hi");
  //   const form = new multiparty.Form();
  //   form.parse(req, async (error, fields, files) => {
  //     if (error) throw new Error(error);
  //     try {
  //       const path = files.file[0].path;
  //       const buffer = fs.readFileSync(path);
  //       const type = fileType(buffer);
  //       const fileName = `bucketFolder/${timestamp}-lg`;
  //       const data = await uploadFile(buffer, fileName, type);
  //       return res.status(200).send(data);
  //     } catch (error) {
  //       return res.status(400).send(error);
  //     }
  //   });
  // })
  // POST PRODUCT
  .post(upload.single("photos"), (req, res) => {
    console.log("hitting", req.body);

    const url = "https://s3-us-west-2.amazonaws.com/artbreakjeh/";
    const title = req.body.title;
    const description = req.body.description;
    // const image_url = req.body.image_url;
    const image_url = url + res.req.file.key;
    const user_id = req.body.user_id;
    const price = req.body.price;

    console.log("post", req.body);
    return new req.database.Product({
      title,
      description,
      image_url,
      user_id,
      price
    })
      .save()
      .then(products => {
        console.log("You have posted to the database and s3");
        return res.json({ success: true });
      })
      .catch(err => {
        console.log("you are fucking up but hitting backend");
        console.log(err);
        res.sendStatus(500);
      });
  });

// EDIT PRODUCT
router.post("/:id", upload.single("photos"), (req, res) => {
  const body = req.body;
  const paramsId = req.params.id;

  const url = "https://s3-us-west-2.amazonaws.com/artbreakjeh/";
  const image_url = url + res.req.file.key;

  const key = req.body.image_url.split("/").pop();

  console.log("key", key);
  console.log("body", body);
  console.log("id", paramsId);

  Product.where({
    id: paramsId
  })
    .fetch()
    .then(product => {
      new Product({
        id: paramsId
      })
        .save(
          {
            title: req.body.title,
            description: req.body.description,
            image_url: image_url,
            user_id: req.body.user_id,
            price: req.body.price,
            updated_at: new Date()
          },
          {
            patch: true
          }
        )
        .then(() => {
          console.log(key);
          s3.deleteObject(
            {
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: key
            },
            function(err, data) {}
          );
          return res.redirect("/");
        });
    });
});

// DELETE PRODUCT
router.delete("/:id", (req, res) => {
  const paramsId = req.params.id;
  const key = req.body.image_url.split("/").pop();

  Product.where({
    id: paramsId
  })
    .fetch()
    .then(product => {
      new Product({
        id: paramsId
      })
        .destroy()
        .then(() => {
          s3.deleteObject(
            {
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: key
            },
            function(err, data) {}
          );

          return res.redirect("/");
        });
    });
});

module.exports = router;
