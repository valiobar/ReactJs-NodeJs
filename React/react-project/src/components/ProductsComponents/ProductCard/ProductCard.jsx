import React from 'react'
import styles from './ProductCard.css'
class ProductCard extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className={styles.container}>ProductCard</div>
    )
  }
}
export default ProductCard