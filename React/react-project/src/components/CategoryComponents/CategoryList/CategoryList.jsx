import React from 'react'
import {Collapsible, CollapsibleItem,Button } from 'react-materialize'
import styles from './CategoryList.css'

class CategoryList extends React.Component{

    renderlist=[]

    constructor(props){
    super(props)


    this.renderCategory=this.renderCategory.bind(this)
  }

  renderCategory(category,indentation){
  this.renderlist.push(  (
      <CollapsibleItem header={category.name} key={category._id} style={{marginLeft  : 15*indentation+'px'}}>
     <ItemComponent item={category} onClickButton={this.props.onCategorySelect}></ItemComponent>
      </CollapsibleItem>))

    if(category.subCategories) {
        indentation++;
      let subCat=[]
      category.subCategories.map(catId=>{
        subCat=this.props.categories.filter(cat=>{return cat._id == catId})
        subCat.map(sub=>this.renderCategory(sub,indentation))
      })
    }

  }

  renderCategories(){
      this.props.categories.filter(cat=>{return cat.parent_category == null}).map(cat=>this.renderCategory(cat,0))
  }
    componentWillMount(){
this.renderCategories()


    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props.categories)
       this.renderCategories()
    }



  render(){


    return (
             <Collapsible popout>
                 {this.renderlist}
             </Collapsible>

    )
  }
}


const ItemComponent = (props) => {
    let item = props.item;
    let productsCount = item.products.length
    let buttonTriger = props.onClickButton;

    return (
        <div>
          <h6>{item.name}</h6> <span>Product : {productsCount}</span>
            <Button modal="confirm" onClick={()=>buttonTriger(item) } waves='green'>Create</Button>
        </div>
    );
}
export default CategoryList