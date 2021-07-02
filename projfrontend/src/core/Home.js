import React from 'react'
import "../styles.css"
import {API} from "../backend"

export default function Home() {
    console.log("APP IS" , API);
    return (
        <div>
            <h1 className="text-white">Hello frontend {API}</h1>
        </div>
    )
}
