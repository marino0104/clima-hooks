import React, {useState} from 'react';

const paises = [
    {
        value:"US",
        nombre:"Estados Unidos"
    },
    {
        value:"MX",
        nombre:"México"
    },
    {
        value:"CO",
        nombre:"Colombia"
    },
    {
        value:"AR",
        nombre:"Argentina"
    },
    {
        value:"CR",
        nombre:"Costa Rica"
    },
    {
        value:"ES",
        nombre:"España"
    },
    {
        value:"PE",
        nombre:"Perú"
    }
]
const Formulario = ({datosConsulta}) => {
    // state del componente
    // busqueda = state, guardarBusqueda= this.setState
    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais:''
    })
    
    const handleChange = e => {
        // cambiar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name]:e.target.value
        })
    }

    const consultarClima = e => {
        e.preventDefault();
        // pasar hacia el componente principal la busqueda del usuario
        datosConsulta(busqueda);
    }
    return (
        <form
            onSubmit={consultarClima}
        >
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select onChange={handleChange} name="pais">
                    <option>Selecciona un país</option>
                    {paises.map((pais, i) => (
                        <option key={i} value={pais.value}>{pais.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="input-field col s12">
                <input type="submit" className="waves-effect waves-light btn-large btn-block yellow accent-4" value="Buscar clima"/>
            </div>
        </form>
    );
};

export default Formulario;