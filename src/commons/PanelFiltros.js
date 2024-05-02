import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function PanelFiltros({ onFiltrarPorTipoDocumento, onFiltrarPorNombre, onLimpiarFiltros }) {
    const [filtro, setFiltro] = useState('');
    const [filtroActivo, setFiltroActivo] = useState(null); // Estado local para filtroActivo
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const handleFiltrarPorTipoDocumento = () => {
        setFiltroActivo('tipoDocumento'); // Establecer filtro activo como 'tipoDocumento'
        onFiltrarPorTipoDocumento(filtro);
    };

    const handleFiltrarPorNombre = () => {
        setFiltroActivo('nombre'); // Establecer filtro activo como 'nombre'
        onFiltrarPorNombre(filtro);
    };

    const handleLimpiarFiltros = () => {
        setFiltro('');
        setFiltroActivo(null); // Al limpiar los filtros, también restablecemos el filtro activo
        onLimpiarFiltros();
    };

    const handleSeleccionarTipoDocumento = (e) => {
        setFiltroActivo('tipoDocumento'); // Establecer filtro activo como 'tipoDocumento'
        setFiltro('');
        onFiltrarPorTipoDocumento(e.target.value);
    };

    const handleBuscar = () => {
        if (filtroActivo === 'tipoDocumento') {
            handleFiltrarPorTipoDocumento();
        } else {
            handleFiltrarPorNombre();
        }
    };

    return (
        <>
        <div className="d-flex justify-content-end" >
        <Link className="nav-link me-2" to="/agregar" style={{ borderRadius: '5px',width: '85%' }}>
    <button className='btn btn-success'>Agregar Persona <FontAwesomeIcon icon={faPlus} /> </button>
  </Link>
            <div className="mb-3 d-flex flex-column" style={{ borderRadius: '5px',width: '40%' }}>
      
                <button
                    className="btn btn-btn btn-active d-flex justify-content-start align-items-center"
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                    style={{ border: '1px solid #ced4da', borderRadius: '5px', paddingLeft: '1rem' }}
                    
                >

                    <FontAwesomeIcon icon={faBars} style={{ marginRight: '0.5rem' }}/>  Filtros de busqueda
                  
                </button>
                <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                        Para un buen funcionamiento  es necesario utilizar el boton 'Limpiar' antes de una nueva busqueda.
                    </div>
                </div>
                {mostrarFiltros && (
                    <div className="d-flex">
                        <div className="me-2">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Ingrese nombre"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                                style={{ borderColor: filtroActivo === 'nombre' ? 'blue' : 'initial' }}
                            />
                        </div>
                        <div>
                            <button
                                className="btn btn-sm btn-primary me-1"
                                onClick={handleBuscar} // Llamar al método handleBuscar
                            >
                                  <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <div className="me-2">
                            <select
                                className="form-select form-select-sm"
                                id="tipoDocumento"
                                name="tipoDocumento"
                                value={filtro}
                                onChange={handleSeleccionarTipoDocumento}
                                style={{ borderColor: filtroActivo === 'tipoDocumento' ? 'blue' : 'initial' }}
                            >
                                <option value="">Tipo de Documento</option>
                                <option value="DNI">DNI</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Cédula">Cédula</option>
                            </select>
                        </div>
                        <div>
                            <button
                                className="btn btn-sm btn-secondary"
                                onClick={handleLimpiarFiltros}
                            >
                                Limpiar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}
