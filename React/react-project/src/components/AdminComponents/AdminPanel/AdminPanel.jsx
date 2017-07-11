import React from 'react'
import categoryActions from '../../../actions/CategotyActions'
import categoryStore from '../../../stores/CategoryStore'
import style from './AdminPanel.css'
import CategoryForm from '../../CategoryComponents/CategoryForm'
import CategoryList from '../../CategoryComponents/CategoryList'
import $ from 'jquery'

class AdminPanel extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      categories: [],
      componentToRender:'',
       categoryToUpdate:{}

    }
    this.handleCategoryCreated = this.handleCategoryCreated.bind(this)
    categoryStore.on(categoryStore.eventTypes.CATEGORY_CREATED, this.handleCategoryCreated)
    this.handleCategoriesFetcked = this.handleCategoriesFetcked.bind(this)
    categoryStore.on(categoryStore.eventTypes.ALL_CATEGORIES_FETCHED, this.handleCategoriesFetcked)
    this.onCategorySelect=this.onCategorySelect.bind(this)
  }

  handleCategoriesFetcked(data){
    this.setState({categories:data.data})
    console.log(JSON.stringify(this.state))
  }

  handleCategoryCreated(data){
      console.log(data.data)
   let categoriesUpdated = this.state.categories;
      categoriesUpdated.push(data.data)
      this.setState({categories:categoriesUpdated},()=> console.log(this.state.categories))

  }
  componentWillMount(){
  categoryActions.gatAll()
  }

  componentWillUnmount() {
    categoryStore.removeListener(categoryStore.eventTypes.CATEGORY_CREATED, this.handleCategoryCreated)

  }
  onCategorySelect(item){
    $('#modalTrigger').click()
      this.setState({categoryToUpdate:item},()=>$('#modalTrigger').click())

  }
  selectComponent(event){

    this.setState({componentToRender:event.target.getAttribute('name')})
    console.log(this.state.componentToRender)
  }
  render(){
    return (
        <div className="adminContainer row">
        <div  className="adminSidePanel col-md-2">
          <div name="CategoryList" onClick={this.selectComponent.bind(this)} className="adminSidePanelItem">
            <p name="CategoryList" >Categories</p>
          </div>
          <div className="adminSidePanelItem">
            <p>Products</p>
          </div>
          <div className="adminSidePanelItem">
            <p>Orders</p>
          </div>
        </div>
          <div className="adminComponents col-md-9">
            {this.state.componentToRender=="CategoryList" &&(
                <div>
                  <CategoryForm categoryToUpdate={this.state.categoryToUpdate} categories={this.state.categories}/>
                <CategoryList onCategorySelect={this.onCategorySelect} categories={this.state.categories}/>

                  </div>
            )}

          </div>


        </div>
    )
  }
}
export default AdminPanel