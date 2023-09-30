const { getUUID } = require('../../shared/utils');
const { SubCategories } = require('../../models');
const baseMap = require('../../shared/basemap');
class SubCategoriesController {
    async addSubCategory(req, res, next) {
        try {
            const body = req.body;
            const newCategory = new SubCategories({
                ...body,
                subcategoryUuid: getUUID(),
                createdBy: '64de4b89ed04ef7e680be864',
                updatedBy: '64de4b89ed04ef7e680be864'
            });

            const category = await newCategory.save();
            baseMap.post(req, res, category)
        } catch (error) {
            next(error)
        }
    }
    async getSubCategories(req, res, next) {
        try {
            const subcategories = await SubCategories.aggregate([
                {
                  $lookup: {
                    from: "categories",
                    localField: "categoryUuid",
                    foreignField: "categoryUuid",
                    as: "categories"
                  }
                }
              ]);
              
            baseMap.getAll(req, res, subcategories)
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new SubCategoriesController();