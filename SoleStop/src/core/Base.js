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
                <div className="container-fluid drkColor text-white text-center py-3">
                    <h4>If you got any questions feel free to reach out</h4>
                    <button className="btn btn-outline btn-lg">Contact us</button>
                </div>
                <div className="container">
                    <span className="text-muted ">Soul to <span className="text-white">Soles</span> </span>
                </div>
            </footer>

        </div>
    )


export default  Base;