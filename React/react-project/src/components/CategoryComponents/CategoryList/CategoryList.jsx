import React from 'react'
import {Collapsible, CollapsibleItem,Collection,CollectionItem } from 'react-materialize'
import styles from './CategoryList.css'
class CategoryList extends React.Component{
  constructor(props){
    super(props)


    this.renderCategory=this.renderCategory.bind(this)
  }

  renderCategory(category,msg){
    console.log(msg)
 console.log( category.subCategories)
    if(category.subCategories) {
      console.log(category)

      console.log('in rec')
      let subCat=[]
      category.subCategories.map(catId=>{
        subCat=this.props.categories.filter(cat=>{return cat._id == catId})

        return this.renderCategory(subCat[0],'recursive')
      })
    }
    console.log('returning- 'category.name )
    return (
        <p>{'>'.repeat(2)+category.name}</p>
    )
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