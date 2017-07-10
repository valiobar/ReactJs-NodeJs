import React from 'react'
import {Collapsible, CollapsibleItem,Collection,CollectionItem } from 'react-materialize'
import styles from './CategoryList.css'
class CategoryList extends React.Component{

    renderlist=[]

    constructor(props){
    super(props)


    this.renderCategory=this.renderCategory.bind(this)
  }

  renderCategory(category,msg){
  this.renderlist.push(  (<p>{category.name}</p>))
      console.log(this.renderlist)
    if(category.subCategories) {

      let subCat=[]
      category.subCategories.map(catId=>{
        subCat=this.props.categories.filter(cat=>{return cat._id == catId})
        subCat.map(sub=>this.renderCategory(sub))
      })
    }

  }
    componentWillMount(){
      console.log("will mo")
        this.props.categories.filter(cat=>{return cat.parent_category == null}).map(cat=>this.renderCategory(cat))

    }



  render(){


    return (
         <div className={styles.container}>
           {this.props.categories.filter(cat=>{return cat.parent_category == null}).map(cat=>this.renderCategory(cat,1))}
        {/* <Collapsible popout >
         <CollapsibleItem header='First' icon='filter_drama'>
         <Collapsible popout>
         <CollapsibleItem header='First' icon='filter_drama'>
         Lorem ipsum dolor sit amet.
         </CollapsibleItem>
         <CollapsibleItem header='First' icon='filter_drama'>
         Lorem ipsum dolor sit amet.
         </CollapsibleItem>
         </Collapsible>
         <CollapsibleItem header='First' icon='filter_drama'>
         Lorem ipsum dolor sit amet.
         </CollapsibleItem>

         </CollapsibleItem>
         <CollapsibleItem header='Second' icon='place'>
         Lorem ipsum dolor sit amet.
         </CollapsibleItem>
         <CollapsibleItem header='Third' icon='whatshot'>
         Lorem ipsum dolor sit amet.
         </CollapsibleItem>
         </Collapsible>*/}
           <Collection>
             <CollectionItem>AlaBala<Collection>
               <CollectionItem>Alvin</CollectionItem>
               <CollectionItem>Alvin</CollectionItem>
               <CollectionItem>Alvin</CollectionItem>
             </Collection></CollectionItem>
             <CollectionItem>Alvin</CollectionItem>
             <CollectionItem>Alvin</CollectionItem>
             <CollectionItem>Alvin</CollectionItem>
           </Collection>
         </div>
    )
  }
}
export default CategoryList