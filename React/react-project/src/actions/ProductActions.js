import dispatcher from '../dispatcher'
import categoryStore from '../stores/CategoryStore'


const categoryActions = {
    types: {
        UPLOAD_IMAGE: 'UPLOAD_IMAGE',
        CREATE_PRODUCT: 'CREATE_PRODUCT',
    },
    createProduct(product){
        console.log(product)
        dispatcher.dispatch({
            type: this.types.CREATE_PRODUCT,
            product
        })
    },


    uploadImage(image){
        console.log(image)
        dispatcher.dispatch({
            type: this.types.UPLOAD_IMAGE,
            image
        })
    }

  /*  gatAll(){
        console.log('action get all')
        dispatcher.dispatch({
            type: this.types.GET_ALL_CATEGORY,

        })
    }*/
}
export default categoryActions