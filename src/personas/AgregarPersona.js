import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft ,faCheck} from '@fortawesome/free-solid-svg-icons';

export default function Agregarpersona() {
    let navegacion = useNavigate();
  
    const [persona, setpersona] = useState({
      "nombre": "",
      "apellido": "",
      "fecha_nacimiento": "",
      "nroDocumento": "",
      "tipoDocumento": ""
    });

    const [showAlert, setShowAlert] = useState(false); 
  
    const { nombre, apellido, fecha_nacimiento, nroDocumento, tipoDocumento } = persona;
  
    const onInputChange = (e) => {
      setpersona({ ...persona, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
          
          if (nombre === "" || apellido === "" || fecha_nacimiento === "" || nroDocumento === "" || tipoDocumento === "") {
            setShowAlert(true); 
            return; 
          }

      const urlBase = 'http://localhost:8080/trimix-api/personas';
      const fechaConHora = `${persona.fecha_nacimiento}T12:00:00`;
  
      const formattedPersona = {
        ...persona,
        fecha_nacimiento: format(new Date(fechaConHora), 'dd-MM-yyyy', { timeZone: 'UTC' })
      };
      await axios.post(urlBase, formattedPersona);
      navegacion('/');
    };
  
    return (
      <>
        <div className='container'>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title" style={{ marginBottom: '20px' }}>Datos Generales</h5>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre</label>
                      <input type="text" className="form-control form-control-sm"
                        id="nombre" name="nombre" required={true}
                        value={nombre} onChange={(e) => onInputChange(e)} />
                     </div>
                     {showAlert && nombre === "" && ( 
                      <div className="alert alert-warning" role="alert">
                        Este campo es requerido
                      </div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="apellido" className="form-label">Apellido</label>
                      <input type="text" className="form-control form-control-sm"
                        id="apellido" name="apellido" required={true}
                        value={apellido} onChange={(e) => onInputChange(e)} />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="nroDocumento" className="form-label">DNI</label>
                      <input type="text" className="form-control"
                        id="nroDocumento" name="nroDocumento" required={true}
                        pattern="[0-9]*"
                        title="El DNI solo debe contener números" 
                        value={nroDocumento} onChange={(e) => onInputChange(e)} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="tipoDocumento" className="form-label">Tipo de Documento</label>
                      <select className="form-select form-select-sm" id="tipoDocumento" name="tipoDocumento" value={tipoDocumento} onChange={(e) => onInputChange(e)} required={true}>
                        <option value="">Seleccionar Tipo de Documento</option>
                        <option value="DNI">DNI</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="Cédula">Cédula</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento</label>
                      <input type="date" className="form-control form-control-sm"
                        id="fecha_nacimiento" name="fecha_nacimiento" required={true}
                        value={fecha_nacimiento} onChange={(e) => onInputChange(e)} />
                    </div>
                  </div>
                </div>
                <div className='text-center'>
                <a href='/' className='btn btn-secondary btn-sm' style={{margin:'10px'}}><FontAwesomeIcon icon={faArrowLeft} /> Regresar</a>
                  <button type="submit" className="btn btn-success btn-sm me-3"> Agregar persona    <FontAwesomeIcon icon={faCheck} /></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
    
  }
  
