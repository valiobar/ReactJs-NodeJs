import React from 'react'
import {Input, Button} from 'react-materialize'
import formOnChangeHandler from '../../../helpers/formHandler/handelFormOnChange'
import categoryActions from '../../../actions/CategotyActions'
import categoryStore from '../../../stores/CategoryStore'
import toastr from 'toastr'


class CategoryForm extends React.Component{
  constructor(props) {
    super(props)
 console.log(props.categories)
    this.state = {
      category: {
        name: '',
        description: '',
        parent_category:null
      },
      error: {
        name: ''

      }
    }

    this.handleCategoryCreated = this.handleCategoryCreated.bind(this)
    categoryStore.on(categoryStore.eventTypes.CATEGORY_CREATED, this.handleCategoryCreated)
  }
  componentWillMount() {
    console.log(this.props.categories)


  }
  componentWillUnmount() {
    console.log('remve list')
    categoryStore.removeListener(categoryStore.eventTypes.CATEGORY_CREATED, this.handleCategoryCreated)

  }

  clearForm(){
    console.log('claer form')
    this.setState({category: {
      name: '',
      description: '',
      parent_category:null
    }})
    this.setState({errors: {
      name: '',
    }})
    console.log(this.state)
  }
  handleCategoryCreated(data){
    if(!data.success){
      if (data.errors) {
        this.setState({error: data.errors})
        return
      }
      toastr.error(data.message)
      return
    }
    toastr.success(data.message)
   this.clearForm()
  }

  handleInputChange(event) {
    formOnChangeHandler(event,'category',this)


  }
validateModel(model){
  let isValid = true;
  let errors = {
   name:''
  }
  if (typeof model.name !== 'string' || model.name.trim().length <3){
    isValid=false;
    errors.name='Name must be at least 3 symbols';

  }
  return{
    isValid:isValid,
    errors:errors
  }
}

  createCategory(event) {
    event.preventDefault()
    let isValid = this.validateModel(this.state.category).isValid;
    this.state.error = this.validateModel(this.state.category).errors
    this.setState({error: this.state.error})
    if (isValid) {
      categoryActions.createCategory(this.state.category);
    }

  }
  render(){
    return (
        <div className="col-md-12" >
          <div className="row">
            <div className="inputContainer col-md-6 ">
              <Input
                  value={this.state.category.name}
                  onChange={this.handleInputChange.bind(this)}
                  type="text"
                  label="Category name"
                  name='name'/>
              <span className="error">{this.state.error.name || ''}</span>
            </div>
          </div>
          <div className="row">
            <div className="inputContainer col-md-6">
              <Input
                  value={this.state.category.description}
                  onChange={this.handleInputChange.bind(this)}
                  name='description'
                  label="Category description"/>
            </div>

          </div>
          <div className="row">
            <div className="inputContainer col-md-6">
              <Input   onChange={this.handleInputChange.bind(this)}   name='parent_category'  type='select' label="Parent Category" placeholder="Select parent category">
                {this.props.categories.map((category) =>
                    <option key={category._id} value={category._id}>{category.name}</option>
              )}
              </Input>
            </div>

          </div>
          <div className="col-md-6 col-md-offset-3">
            <Button onClick={this.createCategory.bind(this)} waves='light'>Create</Button>
          </div>

        </div>
    )
  }
}
export default CategoryForm