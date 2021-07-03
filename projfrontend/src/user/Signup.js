import React, { useSate } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {

  const [values, setValues] =useSate({
    name:"",
    email:"",
    password:"",
    error:"",
    success: false
  });
  
  const {name, email, password, error, success} = values

  const handleChange = name=> event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const onSubmit = event => {
    event.preventDefault()
    setValues({...values, error: false})
    signup({name, email, password})
  }

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">

            <div className="form-group">
              <label htmlFor="" className="text-light">
                Name
              </label>
              <input className="form-control" onChange={handleChange("name")} type="text" />
            </div>
              
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Email
              </label>
              <input className="form-control" onChange={handleChange("email")} type="email" />
            </div>

            <div className="form-group">
              <label htmlFor="" className="text-light">
                password 
              </label>
              <input className="form-control" onChange={handleChange("password")} type="password" />
            </div>

            <button className="btn btn-success btn-block">Submit</button>

          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title=" Sign Up Page" description="A page for signing up">
      {signUpForm()}
    </Base>
  );
};

export default Signup;

