import React from 'react'
import styles from './HomePage.css'
class HomePage extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className={styles.container}>HomePage</div>
    )
  }
}
export default HomePage