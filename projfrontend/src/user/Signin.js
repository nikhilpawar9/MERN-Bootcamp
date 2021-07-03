import React, {useSate} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom"


const Signin = () =>{

    const signInForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form action="">
    
                
                  
                <div className="form-group">
                  <label htmlFor="" className="text-light">
                    Email
                  </label>
                  <input className="form-control" type="email" />
                </div>
    
                <div className="form-group">
                  <label htmlFor="" className="text-light">
                    password 
                  </label>
                  <input className="form-control" type="password" />
                </div>
    
                <button className="btn btn-success btn-block">Submit</button>
    
              </form>
            </div>
          </div>
        );
      }

    return (
        <Base title=" Sign In Page" description="A page for signing In">
        {signInForm()}
        </Base>
    )
}

export default Signin;