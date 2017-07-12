const encryption = require('../utilities/encryption')
const User = require('../data/User')
const Order = require('../data/Order')
const passport = require('passport')
const validator = require('validator')
const Product = require('mongoose').model('Product')
function validateSignupForm(payload) {
    const errors = {}
    let isFormValid = true
    let message = ''

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false
        errors.email = 'Please provide a correct email address.'
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
        isFormValid = false
        errors.password = 'Password must have at least 4 characters.'
    }

    if (!payload || typeof payload.firstName !== 'string' || payload.firstName.trim().length < 3) {
        isFormValid = false
        errors.firstName = 'Please provide your first name.'
    }

    if (!payload || typeof payload.lastName !== 'string' || payload.lastName.trim().length < 3) {
        isFormValid = false
        errors.lastName = 'Please provide your last name.'
    }

    if (!isFormValid) {
        message = 'Check the form for errors.'
    }

    return {
        success: isFormValid,
        message,
        errors
    }
}

function validateLoginForm(payload) {
    const errors = {}
    let isFormValid = true
    let message = ''

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false
        errors.email = 'Please provide your email address.'
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
        isFormValid = false
        errors.password = 'Please provide your password.'
    }

    if (!isFormValid) {
        message = 'Check the form for errors.'
    }

    return {
        success: isFormValid,
        message,
        errors
    }
}


module.exports = {

    registerPost: ((req, res, next) => {
        const validationResult = validateSignupForm(req.body)
        console.log(validationResult)
        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        }

        return passport.authenticate('local-signup', (err) => {
            if (err) {
                console.log(err)
                return res.status(200).json({
                    success: false,
                    message: err
                })
            }

            return res.status(200).json({
                success: true,
                message: 'You have successfully signed up! Now you should be able to log in.'
            })

        })(req, res, next)

    }),
    loginGet: (req, res) => {
        console.log(res.locals.currentUser);
        if (res.locals.currentUser) {
            let user = res.locals.currentUser;
            res.send(user);

        } else {
            res.send(null);
        }

    },

    createOrder(req, res){
        let userId = req.body.userId
        let total=0;
        let order ={
            products:[],
            client,
            totalSum:0
        }
        console.log(userId)
        User.findById(userId)
            .then(user => {
                order.client.push(user._id)
                let basket = user.shoppingBasket
                let itemsPromises = []
                basket.map(itemId=>itemsPromises.push(Product.findById(itemId)))
                Promise.all(itemsPromises).then(items=> {
                  items.map(item=>{
                      order.totalSum=+item.price
                      order.products.push(item._id)
                  })
                    Order.create(order).then(order=>{
                        return res.status(200).json({
                            success: true,
                            message: 'You have successfully submitOrder ',
                            data:order
                        })
                        }

                    )
                })


            })


    },

    postToUserPasket(req, res){
        let userId = req.body.userId
        let item = req.body.item
        console.log('USER IID  ' + userId)
        User.findById(userId).then(user => {
            user.shoppingBasket.push(item)
            user.save()
                .then(result=> {
                    console.log(result)
                    return res.status(200).json({
                        success: true,
                        message: 'You have successfully add item !',

                    })
                })


        })
    },

    loginPost: ((req, res, next) => {

        const validationResult = validateLoginForm(req.body)
        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        }

        return passport.authenticate('local-login', (err, token, userData) => {
            if (err) {
                if (err.name === 'IncorrectCredentialsError') {
                    return res.status(200).json({
                        success: false,
                        message: err.message
                    })
                }

                return res.status(200).json({
                    success: false,
                    message: 'Could not process the form.'
                })
            }

            return res.json({
                success: true,
                message: 'You have successfully logged in!',
                token,
                user: userData
            })
        })(req, res, next)
    }),

    getProfile: (req, res)=> {
        res.json("uhuuu")

    }

}
