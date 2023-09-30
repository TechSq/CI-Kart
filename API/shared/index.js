const { Categories } = require('../models');
const { getUUID } = require('../shared/utils');

const createCategories = async (data) => {
    try {
        const categoriesArray = [];
        for (const el of data) {
            const categoriesPayload = {
                categoryId: getUUID(),
                categoryName: el._0,
                isDeleted: false,
                isActive: true,
                created_by: 'admin',
                updated_by: 'admin'
            };
            categoriesArray.push(categoriesPayload);
        }
        const result = await Categories.insertMany(categoriesArray);
        return result;
    } catch (error) {
        return (error);
    }
};

module.exports = { createCategories };