const { Products } = require('../../models');
const bcrypt = require('bcrypt');
const baseMap = require('../../shared/basemap');
const { getUUID } = require('../../shared/utils');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sabarish.i2sts@gmail.com",
        pass: "lbzoldxxbdzhzxln",
    },
});
class ProductController {
    async addProduct(req, res, next) {
        try {
            const body = req.body;
            const newProcuct = new Products({
                ...body,
                productUuid: getUUID(),
                status: 'Approved',
                createdBy: '64de4b89ed04ef7e680be864',
                updatedBy: '64de4b89ed04ef7e680be864'
            });

            const product = await newProcuct.save();
            baseMap.post(req, res, product)
        } catch (error) {
            next(error);
        }
    }
    async addProductByVendor(req, res, next) {
        try {
            const body = req.body;
            const newProcuct = new Products({
                ...body,
                productUuid: getUUID(),
                status: 'Requested',
                createdBy: '64de4b89ed04ef7e680be864',
                updatedBy: '64de4b89ed04ef7e680be864'
            });
            const mailOptions = {
                from: "sabarish.i2sts@gmail.com",
                to: 'sabarish.i2sts@gmail.com',
                subject: "Product Request",
                text: `you have received a Product request from a vendor`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error occurred:", error);
                } else {
                    console.log("Email sent:", info.response);
                }
            });
            const product = await newProcuct.save();
            baseMap.post(req, res, product)
        } catch (error) {
            next(error);
        }
    }
    async updateProduct(req,res,next){
        try {
            const{id, status} = req.body;
            const product = await Products.findOneAndUpdate({ _id: id }, { status });
            baseMap.put(req,res,product);
        } catch (error) {
            next(error);
        }
    }
    async listProducts(req, res, next) {
        try {
            const products = await Products.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "categoryUuid",
                        foreignField: "categoryUuid",
                        as: "category"
                    }
                },
                {
                    $lookup: {
                        from: "sub_categories",
                        localField: "subcategoryUuid",
                        foreignField: "subcategoryUuid",
                        as: "subcategory"
                    }
                },
                {
                    $lookup: {
                        from: "vendors",
                        localField: "vendorUuid",
                        foreignField: "vendorUuid",
                        as: "vendor"
                    }
                },
                {
                    $addFields: {
                        category: { $arrayElemAt: ["$category", 0] },
                        subcategory: { $arrayElemAt: ["$subcategory", 0] },
                        vendor: { $arrayElemAt: ["$vendor", 0] }
                    }
                },
                {
                    $match: {
                        status: 'Approved'
                    }
                }
            ]);
            baseMap.getAll(req, res, products);
        } catch (error) {
            console.error('Error:', error);
            baseMap.error(req, res, error)
        }
    }
    async listRequestedProducts(req, res, next) {
        try {
            const products = await Products.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "categoryUuid",
                        foreignField: "categoryUuid",
                        as: "category"
                    }
                },
                {
                    $lookup: {
                        from: "sub_categories",
                        localField: "subcategoryUuid",
                        foreignField: "subcategoryUuid",
                        as: "subcategory"
                    }
                },
                {
                    $lookup: {
                        from: "vendors",
                        localField: "vendorUuid",
                        foreignField: "vendorUuid",
                        as: "vendor"
                    }
                },
                {
                    $addFields: {
                        category: { $arrayElemAt: ["$category", 0] },
                        subcategory: { $arrayElemAt: ["$subcategory", 0] },
                        vendor: { $arrayElemAt: ["$vendor", 0] }
                    }
                },
                {
                    $match: {
                        status: 'Requested'
                    }
                }
            ]);
            baseMap.getAll(req, res, products);
        } catch (error) {
            console.error('Error:', error);
            baseMap.error(req, res, error)
        }
    }
}

module.exports = new ProductController();
