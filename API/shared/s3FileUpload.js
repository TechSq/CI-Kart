const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");
const formidable = require("formidable").formidable;

const Transform = require("stream").Transform;
const { s3 } = require("../config/config.json");

const accessKeyId = s3.accessKey;
const secretAccessKey = s3.secretAccessKey;
const region = s3.region;
const Bucket = s3.bucketName;

const s3FileUpload = async (req) => {
  return new Promise((resolve, reject) => {
    let options = {
      maxFileSize: 100 * 1024 * 1024, //100 MBs converted to bytes,
      allowEmptyFiles: false,
    };

    const form = formidable(options);

    form.parse(req, (err, fields, files) => {});

    form.on("error", (error) => {
      console.log("Error", error);
      reject(error.message);
    });

    form.on("data", (data) => {
      console.log("Data", data);
      if (data.name === "successUpload") {
        resolve(data.value);
      }
    });

    form.on("fileBegin", (formName, file) => {
      console.log("file", file);
      file.open = async function () {
        this._writeStream = new Transform({
          transform(chunk, encoding, callback) {
            callback(null, chunk);
          },
        });

        this._writeStream.on("error", (e) => {
          console.log("writeError", e);
          form.emit("error", e);
        });

        // upload to S3
        new Upload({
          client: new S3Client({
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            region,
          }),
          params: {
            ACL: "public-read",
            Bucket,
            Key: `${
              req.params.folder ? req.params.folder : "profile"
            }/${Date.now().toString()}-${this.originalFilename}`,
            Body: this._writeStream,
          },
          tags: [], // optional tags
          queueSize: 4, // optional concurrency configuration
          partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // optional manually handle dropped parts
        })
          .done()
          .then((data) => {
            form.emit("data", { name: "successUpload", value: data });
          })
          .catch((err) => {
            console.log("uploadError", err);
            form.emit("error", err);
          });
      };

      file.end = function (cb) {
        this._writeStream.on("finish", () => {
          this.emit("end");
          cb();
        });
        this._writeStream.end();
      };
    });
  });
};

module.exports = s3FileUpload;
