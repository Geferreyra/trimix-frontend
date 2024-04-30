import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft,faCheck} from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

export default function EditarPersona() {
  const urlBase = 'http://localhost:8080/trimix-api/personas';
  const { id } = useParams();
  let navegacion = useNavigate();

  const [persona, setPersona] = useState({
    "nombre": "",
    "apellido": "",
    "fecha_nacimiento": "",
    "dni": "",
    "tipoDocumento": ""
  });

  useEffect(() => {
    cargaPersona();
  }, []);

  const cargaPersona = async () => {
    try {
      const response = await axios.get(`${urlBase}/${id}`);
    
      const data = response.data;
     
      const fechaNacimientoParts = data.fecha_nacimiento.split('-');
    
      const fechaNacimientoFormateada = `${fechaNacimientoParts[2]}-${fechaNacimientoParts[1]}-${fechaNacimientoParts[0]}`;

      setPersona({
        nombre: data.nombre,
        apellido: data.apellido,
        fecha_nacimiento: fechaNacimientoFormateada,
        nroDocumento: data.nroDocumento,
        tipoDocumento: data.tipoDocumento
      });
    } catch (error) {
      console.error('Error al cargar la persona:', error);
    }
  };

  const onInputChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const fechaConHora = `${persona.fecha_nacimiento}T12:00:00`; 
      const formattedPersona = {
        ...persona,
        fecha_nacimiento: format(new Date(fechaConHora), 'dd-MM-yyyy', { timeZone: 'UTC' })
      };
      console.log('Fecha enviada al backend:', formattedPersona.fecha_nacimiento);
      await axios.put(`${urlBase}/${id}`, formattedPersona);
      navegacion('/');
    } catch (error) {
      console.error('Error al guardar la persona:', error);
    }
  };

  const { nombre, apellido, fecha_nacimiento, nroDocumento, tipoDocumento } = persona;

  return (
    <>
    <div className='container'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title" style={{ marginBottom: '20px' }}>Editar datos generales</h5>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" className="form-control"
                    id="nombre" name="nombre" required={true}
                    value={nombre} onChange={(e) => onInputChange(e)} />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">Apellido</label>
                  <input type="text" className="form-control"
                    id="apellido" name="apellido"
                    value={apellido} onChange={(e) => onInputChange(e)} />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="nroDocumento" className="form-label">DNI</label>
                  <input type="text" className="form-control"
                    id="nroDocumento" name="nroDocumento"
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
                  <select className="form-select" id="tipoDocumento" name="tipoDocumento"
                    value={tipoDocumento} onChange={(e) => onInputChange(e)}>
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Cédula">Cédula</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento</label>
                  <input type="date" className="form-control"
                    id="fecha_nacimiento" name="fecha_nacimiento"
                    value={fecha_nacimiento} onChange={(e) => onInputChange(e)} />
                </div>
              </div>
            
            </div>
            <div className='text-center'>
            <a href='/' className='btn btn-secondary btn-sm' style={{margin:'10px'}}><FontAwesomeIcon icon={faArrowLeft} /> Regresar</a>
            <button type="submit" className="btn btn-success btn-sm me-3" > Guardar persona  <FontAwesomeIcon icon={faCheck} /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}
