import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import Filtros from '../commons/PanelFiltros';

export default function ListadoPersonas() {
  const urlBase = 'http://localhost:8080/trimix-api/personas';

  const [personas, setPersonas] = useState([]);
  const [personasOriginales, setPersonasOriginales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroActivo, setFiltroActivo] = useState(null);

  useEffect(() => {
    cargaPersonas();
  }, []);

  const cargaPersonas = async () => {
    try {
      const response = await axios.get(urlBase);
      setPersonas(response.data);
      setPersonasOriginales(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar personas:', error);
    }
  };


  const eliminarPersona = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta persona?");
    if (confirmacion) {
      await axios.delete(`${urlBase}/${id}`);
      cargaPersonas();
    }
  };

  const filtrarPorTipoDocumento = async (tipoDocumento) => {
    setLoading(true);
    try {
      if (!tipoDocumento) {
        setPersonas(personasOriginales);
      } else {
        const response = await axios.get(`${urlBase}/filtrar/tipo-de-documento/${tipoDocumento}`);
        setPersonas(response.data);
      }
      setLoading(false);
      setFiltroActivo('tipoDocumento');
    } catch (error) {
      console.error('Error al filtrar personas por tipo de documento:', error);
      setLoading(false);
    }
  };


  const filtrarPorNombre = async (nombre) => {
    setLoading(true);
    try {
      if (!nombre) {
        setPersonas(personasOriginales);
      } else {
        const response = await axios.get(`${urlBase}/filtrar/nombre/${nombre}`);
        setPersonas(response.data);
      }
      setLoading(false);
      setFiltroActivo('nombre');
    } catch (error) {
      console.error('Error al filtrar personas por nombre:', error);
      setLoading(false);
    }
  };

  const handleLimpiarFiltros = async () => {
    setLoading(true);
    try {
      const response = await axios.get(urlBase);
      setPersonas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al limpiar filtros:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className='container'>
      <div >
         <h2 className='display-3'  style={{ textAlign: 'center', margin:'10px' }}>Personas</h2>
         </div>
        <div className='d-flex justify-content align-items-center mt-4'>
             
        </div>

        <Filtros
          onFiltrarPorTipoDocumento={filtrarPorTipoDocumento}
          onFiltrarPorNombre={filtrarPorNombre}
          onLimpiarFiltros={handleLimpiarFiltros}
          filtroActivo={filtroActivo}
        />

        {loading ? (
          <p>Cargando personas...</p>
        ) : (
          <table className="table table-striped table-hover align-middle">
            <thead className='table-dark'>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Tipo de documento</th>
                <th scope="col">NRO</th>
                <th scope="col">Fecha de nacimiento</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {personas.map(persona => (
                <tr key={persona.id}>
                  <th scope="row">{persona.id}</th>
                  <td>{persona.nombre}</td>
                  <td>{persona.apellido}</td>
                  <td>{persona.tipoDocumento}</td>
                  <td>
                    <NumericFormat
                      value={persona.nroDocumento}
                      displayType={'text'}
                      thousandSeparator=''
                      decimalScale={0}
                    />
                  </td>
                  <td>{persona.fecha_nacimiento}</td>
                  <td className='text-center'>
                    <div>
                      <Link to={`/editar/${persona.id}`} className='btn btn btn-primary btn-sm me-1'>Editar</Link>
                      <button onClick={() => eliminarPersona(persona.id)} className='btn btn-danger btn-sm'>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
