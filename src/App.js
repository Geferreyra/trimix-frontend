import {BrowserRouter,Route, Routes} from 'react-router-dom';
import ListadoPersonas from './personas/ListadoPersonas';
import Navegacion from "./commons/Navegacion";
import AgregarPersona from './personas/AgregarPersona';
import EditarPersona from './personas/EditarPersona';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <div className='container'>
          {/* Agregar un margen superior style={{ marginTop: '30px' }}*/}
         
        <BrowserRouter>
          <Navegacion/>
          <div style={{ marginTop: '40px' }}>
            <Routes>
              <Route exact path='/' element={<ListadoPersonas/>}/>
              <Route exact path='/agregar' element={<AgregarPersona/>}/>
              <Route exact path='/editar/:id' element={<EditarPersona/>}/>
            </Routes>
            </div>
        </BrowserRouter>
   
      </div>

    </>
  );
}

export default App;
