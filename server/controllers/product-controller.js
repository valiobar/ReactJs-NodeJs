const Product = require('mongoose').model('Product')
const validator = require('../utilities/validators/productFormValidator')
const Category = require('mongoose').model('Category')

module.exports = {

    productCreate: (req, res) => {
        let newProduct = req.body;
        console.log('newProduct : '+newProduct)

        let  validationResult=validator(newProduct);

        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        }
        Product.create({
            name:newProduct.name,
            description: newProduct.description,
            category: newProduct.category,
            price: newProduct.price,
            images:newProduct.images ,
        }).then((addedProduct)=>{
            console.log(addedProduct)
            if(addedProduct.category){
                Category.findById(addedProduct.category).then((category)=>{
                    console.log(category);
                      category.products.push(addedProduct._id)

                    category.save().then((result)=>{
                        console.log('sccess')
                        console.log(result)
                        return res.status(200).json({
                            success: true,
                            message: 'You have successfully add product ',
                            data:addedProduct
                        })
                    })
                })
            } else{
                return res.status(200).json({
                    success: true,
                    message: 'You have successfully add product ',
                    data:addedProduct
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
