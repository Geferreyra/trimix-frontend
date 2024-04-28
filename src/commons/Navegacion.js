import React from 'react'
import logo from './trimix-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons';

export default function Navegacion() {
    return (
        <>
            <div className='container'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                    <div className="container-fluid">
                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/"><FontAwesomeIcon icon={faHouse} />  Inicio</a>
                                </li>
                             
                            </ul>
                        </div>
                    </div>
                    <a className="navbar-brand" href="https://www.trimix.com.ar/"><img src={logo} alt='HOME' style={{ width: '55px' }}></img></a>
                </nav>
                <div className="container text-center" style={{ marginTop: '10px' }}>
                <h3></h3>
                </div>
            </div> 
        </>
    );
}
