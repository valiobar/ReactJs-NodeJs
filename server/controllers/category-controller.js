const Category = require('mongoose').model('Category')
const validator = require('../utilities/validators/categoryFormValidator')
function validateCategoryModel(categoryModel){
    const errors = {};
    let isFormValid = true;
    let message = '';
    console.log(JSON.stringify(categoryModel))
    if (!categoryModel || typeof categoryModel.name !== 'string' ||categoryModel.name.trim().length < 3) {

        isFormValid = false
        errors.name = 'Category name must be at least 3 symbols.'
        message ='Check form'
    }
    return {
        success: isFormValid,
        message,
        errors
    }
}
module.exports = {

    gatAll:(req, res)=>{

        Category.find({}).sort({name: 1}).then((catageories)=>{
            return res.status(200).json({
                success: true,
                message: 'Categories fetched',
                data:catageories
            })
        })
            .catch(error=>console.log(error))
    },

    categoryCreate: (req, res) => {
        let newCategoty = req.body;
        console.log('newCategoty : '+newCategoty)

       let  validationResult=validateCategoryModel(newCategoty)

        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        }
        Category.create({
            name : newCategoty.name,
            description:newCategoty.description,
            parent_category: newCategoty.parent_category||null,
            subCategories:newCategoty.subCategories||null,
        }).then((cat)=>{
            console.log(cat.parent_category)
            if(cat.parent_category){
                Category.findById(cat.parent_category).then((parentCategory)=>{
                 console.log(parentCategory);
                    if(parentCategory.subCategories==null){
                        parentCategory.subCategories=[]
                    }
                    console.log(cat.parent_category)
                    parentCategory.subCategories.push(cat._id);
                    parentCategory.save().then((result)=>{
                        console.log('sccess')
                        console.log(result)
                        return res.status(200).json({
                            success: true,
                            message: 'You have successfully create category ',
                            data:cat
                        })
                    })
                })
            } else{
                return res.status(200).json({
                    success: true,
                    message: 'You have successfully create category ',
                    data:cat
                })
            }

        })
            .catch(error=>res.status(200).json({
                success: false,
                message:error.message,
                errors: error
            }))

    }
}