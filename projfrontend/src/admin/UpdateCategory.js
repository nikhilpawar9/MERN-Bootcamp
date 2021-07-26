import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from "react-router-dom";
import {getCategory, getCategories, updateProduct, updateCategory} from "./helper/adminapicall"
import { isAuthenticated } from '../auth/helper';




const  UpdateCategory = ({match}) => {

    const {user, token} = isAuthenticated();

    const [values, setValues] = useState({
        name:"",
        loading: false,
        error:"",
        updatedCategory: "",
        getaRedirect:false,
        formData:""
    })

    const {name, loading, error, updatedCategory, getaRedirect, formData } = values;

    const preload = (categoryId) =>{
        getCategory(categoryId).then(data =>{
        if (data.error) {
          setValues({...values, error:data.error})
        }
        else{
          setValues({
              ...values,
              name: data.name,
              formData: new FormData(),
              
          })
          console.log("preload formData", formData)

          
        }
      })
    }


    useEffect(() => {
      preload(match.params.categoryId);
    }, []);


    const onSubmit = (event) => {
      event.preventDefault();
      setValues({...values, error:"", loading:true})
      console.log("onsubmit NAME : ", name)
      console.log("onsubmit formData : ",formData)
      // console.log(" category ID : ",match.params.categoryId)
    
      updateCategory(match.params.categoryId, user._id, token, formData).then(data =>{
        if (data.error) {
        console.log(" ERROR")
        // console.log(" data is : ", data)

          setValues({...values, error: data.error})
          
        }else{
        console.log("NO ERROR")
          setValues({
            ...values,
            name:"",
            loading:false,
            updatedCategory: data.name,
          })
        }
      })
    };
    const handleChange = event  => {
      const value = event.target.value
      console.log("handleChange  value: ",value)

      formData.set("name", value)
      console.log("handleChange formData : ",formData)

      setValues({...values, name:value})

    };

    const successMessage = () =>(
      <div className="alert alert-success mt-3"
      style={{display: updatedCategory ? "" : "none"}}>
        <h4>{updatedCategory} updated succesfully</h4>
      </div>
    )
    const errorMessage = () =>(
      <div className="alert alert-danger mt-3"
      style={{display: error ? "" : "none"}}>
        <h4>{error} | Product was not updated</h4>
      </div>
    )

    const updateCategoryForm = () => (
        <form >

          <div className="form-group mb-3">
            <input
              onChange={handleChange}
              name='name'
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>      
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Update Category
          </button>

        </form>
      );

    return (
        <Base title="Add a product here"
        description="Welcome to Product creation"
        className="container bg-info p-4">
        <h1 className="text-white">Update Category</h1>

        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
            Admin Home </Link>

        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
            {successMessage()}
            {errorMessage()}
            {updateCategoryForm()}
            </div>
        </div>


        </Base>
        
    )
}

export default UpdateCategory;

