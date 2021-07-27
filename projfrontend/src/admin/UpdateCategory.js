import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from "react-router-dom";
import {getCategory, getCategories, updateProduct, updateCategory} from "./helper/adminapicall"
import { isAuthenticated } from '../auth/helper';




const  UpdateCategory = ({match}) => {

    const {user, token} = isAuthenticated();
    const [name, setName] = useState("");
    const [err, setErr] = useState("");
    const [upcat, setUpcat] = useState("");



    const preload = (categoryId) =>{
        getCategory(categoryId).then(data =>{
          console.log(data.name)
        if (data.error) {
         setErr(data.error)
        }
        else{
          setName(data.name)
          setErr("")
          // setValues({
          //     ...values,
          //     name: data.name,
          //     // formData: new FormData(),
              
          // })
          // console.log("preload formData", formData)

          
        }
      })
    }


    useEffect(() => {
      preload(match.params.categoryId);
    }, []);


    const onSubmit = (event) => {
      event.preventDefault();
      // console.log("onsubmit formData : ",formData)
      // console.log(" category ID : ",match.params.categoryId)
    
      updateCategory(match.params.categoryId, user._id, token, {name}).then(data => {
        if (data.error) {
        setErr(data.error)
        }else{
          setName(data.name)
          setErr("")
          setUpcat(data.name)
        }
      })
    };

    const handleChange = event  => {
      setName(event.target.value)
    };

   const successMessage = () =>(
      <div className="alert alert-success mt-3"
      style={{display: upcat ? "" : "none"}}>
        <h4>{upcat} updated succesfully</h4>
      </div>
    ) 
    const errorMessage = () =>(
      <div className="alert alert-danger mt-3"
      style={{display: err ? "" : "none"}}>
        <h4>{err} | Product was not updated</h4>
      </div>
    )

    const updateCategoryForm = () => (
        <form >

          <div className="form-group mb-3">
            <input
              onChange={(e) => handleChange(e)}
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

