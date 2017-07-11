module.exports = (productModel)=> {

    let name = productModel.name;
    let price= productModel.price;

    let isFormValid = true;
    let message = '';
    let errors = { }


    if (typeof name !== 'string' || name.trim().length <3){
        isFormValid=false;
        errors.name='Product name must be at least 3 symbols';
        message='Check Form'
    }
    console.log(typeof price)
    if (typeof +price !== 'number' || price <0){
        isFormValid=false;
        errors.price='Price is not valid';
        message='Check Form'

    }

    return {
        success:isFormValid,
        message:message,
        errors:errors
    }
}
