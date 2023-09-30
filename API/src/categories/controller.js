const fs = require('fs');
const csv = require('csv-parser');
const { Categories } = require('../../models');
const baseMap = require('../../shared/basemap');
const { getUUID } = require('../../shared/utils');
const { createCategories } = require('../../shared');
const { categoryList } = require('../../shared/constant-values');
class CategoriesController {
    async readCsvFile(req, res, next) {
        try {
            const filePath = req.file.path;
            const results = [];
            const body = req.body;
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    if (
                        Object.values(data).some((value) => value !== '') &&
                        body.type == 'brands'
                    ) {
                        results.push(data);
                    } else if (
                        Object.values(data).some(
                            (value) => value !== '' && value !== 'Categories'
                        ) &&
                        body.type == 'categories'
                    ) {
                        results.push(data);
                    } else if (
                        Object.values(data).some(
                            (value) => value !== '' && value !== 'Question Type'
                        ) &&
                        body.type == 'questions'
                    ) {
                        results.push(data);
                    }
                })
                .on('end', () => {
                    try {
                        switch (body.type) {
                            case 'categories':
                                createCategories(results)
                                    .then((data) => {
                                        if (!data.errors) {
                                            baseMap.post(req, res, data);
                                        } else {
                                            baseMap.error(req, res, data.errors);
                                        }
                                    })
                                    .catch((error) => {
                                        next(error);
                                    });
                                break;
                            default:
                                break;
                        }
                    } catch (err) {
                        next(err);
                    } finally {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.log('error deleting file:', err);
                            }
                        });
                    }
                });

        } catch (error) {
            next(error);
        }
    }
    async addCategory(req, res, next) {
        try {
            const body = req.body;
            const lastCategory = await Categories.findOne({}, { sort: { category_id: -1 } });

            let newCategoryId = '#001';

            if (lastCategory && lastCategory.categoryId) {
                const lastNumericPart = parseInt(lastCategory.categoryId.slice(1), 10);
                const newNumericPart = lastNumericPart + 1;
                newCategoryId = `#${String(newNumericPart).padStart(3, '0')}`;
            }

            const newCategory = new Categories({
                ...body,
                categoryId: newCategoryId,
                categoryUuid: getUUID(),
                createdBy: '64de4b89ed04ef7e680be864',
                updatedBy: '64de4b89ed04ef7e680be864'
            });

            const category = await newCategory.save();
            baseMap.post(req, res, category)
        } catch (error) {
            next(error)
        }
    }
    async getSampleCategories(req, res, next) {
        try {
            baseMap.getAll(req, res, categoryList)
        } catch (error) {
            next(error);
        }
    }
    async getCategories(req, res, next) {
        try {
            const categories = await Categories.find();
            baseMap.getAll(req, res, categories)
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new CategoriesController();