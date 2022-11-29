
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return (
        <div >            
            <h1>Bienvenidos xD</h1>
            <Link to= '/home'>
                <button>Inicio</button>
            </Link>
        </div>
        
    )
}