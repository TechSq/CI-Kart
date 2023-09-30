const { Attribute, Categories, SubCategories } = require("../../models");
const baseMap = require("../../shared/basemap");
const s3FileUpload = require("../../shared/s3FileUpload");

class CommonController {
  async uploadToS3(req, res) {
    await s3FileUpload(req)
      .then((data) => {
        console.log("IData", data);
        res.status(200).json({
          message: "Success",
          data,
        });
      })
      .catch((error) => {
        console.log("ErrorUpload", error);
        res.status(400).json({
          message: "An error occurred.",
          error,
        });
      });
  }

  async getAllAttributes(req, res) {
    try {
      const attributes = await Attribute.find();
      let resData = [];
      if (attributes && attributes.length > 0) {
        resData = attributes;
      }
      resData = resData.map((a, index) => {
        return {
          ...a._doc,
          sno: index + 1,
        };
      });
      baseMap.getAll(req, res, resData);
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async addAttributeGroup(req, res) {
    try {
      const { attributeName, values, isSingle } = req.body;

      const newAttribute = new Attribute({
        attributeName: attributeName,
        attributeValues: values ? values : [],
        isSingle,
      });
      await newAttribute.save();
      baseMap.post(req, res, newAttribute);
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await Categories.find();
      let resData = [];
      if (categories && categories.length > 0) {
        resData = categories;
      }
      resData = resData.map((a, index) => {
        return {
          ...a._doc,
          sno: index + 1,
        };
      });
      baseMap.getAll(req, res, resData);
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async getAllSubCategories(req, res) {
    try {
      const categories = await SubCategories.find();
      let resData = [];
      if (categories && categories.length > 0) {
        resData = categories;
      }
      resData = resData.map((a, index) => {
        return {
          ...a._doc,
          sno: index + 1,
        };
      });
      baseMap.getAll(req, res, resData);
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }
}

module.exports = new CommonController();
