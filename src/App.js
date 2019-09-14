import React, {useState, useEffect} from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Error from './Components/Error';
import Clima from './Components/Clima';

function App() {
  // generar el state principal
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado]=useState({})

  useEffect(() => {
    // prevenir ejecucion
    if (ciudad === '') return;
    const consultarAPI = async () => {
      const appId = 'af14ef2b7008115571feea5ffe99ecf2'
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
      // consultar url
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarResultado(resultado)

    }

    consultarAPI();
  }, [ciudad, pais])

  const datosConsulta = datos => {
    // validar que ambos campos esten
    if (datos.ciudad === "" || datos.pais === "") {
      guardarError(true)
      // error
      return;
    }
    // ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false)
  }
  
  // cargar un componente condicionalmente
  let componente;
  if (error) {
    // hay un error, mostrarlo
    componente=<Error mensaje="Ambos campos son obligatorios"/>
  } else if (resultado.cod==="404") {
    componente = <Error mensaje="La ciudad no existe en nuestra base de datos." />
  } else {
    // mostrar el clima
    componente = <Clima resultado={resultado}/>;
  }
  return (
    <div className="App">
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta}/>
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
