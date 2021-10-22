import React from 'react'
import Menu from './menu';


const Base = ({
    title = " My title",
    description = " my description",
    className = "bg-dark text-white p-4",
    children
}) => 
    (
        <div>
            <Menu/>
            <div className="container-fluid">
                <div className="jummbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>if you got any questions feel free to reach out</h4>
                    <button className="btn btn-warning btn-lg">Contact us</button>
                </div>
                <div className="container">
                    <span className="text-muted ">Amazing <span className="text-white">MERN</span> Bootcamp</span>
                </div>
            </footer>

        </div>
    )


export default  Base;