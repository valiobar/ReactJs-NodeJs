import React from 'react'
import styles from './HomePage.css'
import ProductList from '../ProductsComponents/ProductList'


class HomePage extends React.Component{
  constructor(props){
    super(props)




  }
  render(){
    return (
      <div className={styles.container}>HomePage
      <ProductList listType="card" />

      </div>
    )
  }
}
export default HomePage