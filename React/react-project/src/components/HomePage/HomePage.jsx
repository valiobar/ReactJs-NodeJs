import React from 'react'
import styles from './HomePage.css'
import auth from '../../common/appRouter/Auth'
import ProductList from '../ProductsComponents/ProductList'
import userStore from '../../stores/UserStore'
import userAction from '../../actions/UserActions'
import toastr from 'toastr'
import orderStore from '../../stores/OrderStore'
import orderAction from '../../actions/OrderActions'

class HomePage extends React.Component{
  constructor(props){
    super(props)




    this.handleItemAddToBasket = this.handleItemAddToBasket.bind(this)
    userStore.on(userStore.evetTypes.ITEM_ADDED_TO_BASKET, this.handleItemAddToBasket)
  }

  componentWillUnmount() {
    userStore.removeListener(userStore.evetTypes.ITEM_ADDED_TO_BASKET, this.handleItemAddToBasket)


  }
  handleItemAddToBasket(data){
    if (!data.success) {

      toastr.error(data.message)
      return
    }
    toastr.success(data.message)

  }

  checkOut(){
    let userId = auth.getUser().id
    orderAction.createOrder(userId)
  }

  onAddToBasket(productId){
    console.log(auth.getUser())
    let userId = auth.getUser().id
    let itemId =productId
    userAction.addToUserBasket({
      userId:userId,
      item:itemId})


  }
  render(){
    return (
      <div className={styles.container}>HomePage
      <ProductList checkout={this.checkOut.bind(this)} addToBasket={this.onAddToBasket.bind(this)} listType="card" />

      </div>
    )
  }
}
export default HomePage