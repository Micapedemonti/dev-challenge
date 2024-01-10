import { useState } from "react";
import PropTypes from "prop-types";
import { gql, useLazyQuery } from "@apollo/client";
import { Icon } from '@iconify/react';
import './Buscar.css';

const GET_PERSONAJE_DETALLES = gql`
  query GetPersonajeDetalles($name: String, $status: String, $gender: String, $species: String) {
    characters(filter: {
      name: $name
      status: $status
      gender: $gender
      species: $species
    }) {
      results {
        id
        name
        image
        species
        type
        gender
        status
        location {
          id
          name
          type
          dimension
        }
      }  
    }
  }
`;

const Buscar = ({ onSearch }) => {
// Estados para controlar los valores de búsqueda y la visibilidad del detalle del personaje
  const [nombre, setNombre] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [showDetalle, setShowDetalle] = useState(false);

  const [getDetalles, { loading, error, data }] = useLazyQuery(GET_PERSONAJE_DETALLES, {
    variables: {
      name: nombre,
      status: status,
      gender: gender,
      species: species,
    }
  });
 //  llama a la función onSearch y muestra los detalles del personaje
  const handleSearch = () => {
    getDetalles({
      variables: {
        name: nombre,
        status: status,
        gender: gender,
        species: species,
      }
    });

    onSearch(nombre);
    setShowDetalle(true); 
  };
 // resetear los filtros y ocultar los detalles del personaje
  const resetearFiltros = () => {
    setNombre("");
    setStatus("");
    setGender("");
    setSpecies("");
    setShowDetalle(false); 
  };

  return (
    <div className="buscar-container">
      <div className="buscar_inputs">
        <div className="inputs">
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="input_buscar" placeholder="Buscar por nombre" />
          <button onClick={handleSearch}>
            <Icon icon="material-symbols-light:search" width="25" height="25" />
          </button>
        </div>
        <div className="filtros">
          <div>
            <select className="options" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="" className="options">Status...</option >
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          
          <div>
            <select className="options" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value=""className="options">Gender...</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="genderless">genderless</option>
              <option value="unknown">unknown</option>
            </select>
          </div>

          <div>
            <select className="options" value={species} onChange={(e) => setSpecies(e.target.value)}>
              <option  value="">Species...</option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <button onClick={resetearFiltros} >Resetear filtros</button>
        </div>
        {loading && <div>Cargando...</div>}
        {error && <div>Algo ha salido mal...</div>}
      </div>

      {showDetalle && data && data.characters.results.length > 0 && (
        <div className="personaje-buscado">
          <img src={data.characters.results[0].image} alt={data.characters.results[0].species} />
          <div className="personaje-detalle">
            <h1>
              <span className="name">{data.characters.results[0].name}</span>
            </h1>
            <p>
              <span className="title-label">Gender:</span>
              <span className="value">{data.characters.results[0].gender}</span>
            </p>
            <p>
              <span className="title-label">Species:</span>
              <span className="value">{data.characters.results[0].species}</span>
            </p>
            <p>
              <span className="title-label">Status:</span>
              <span className="value">{data.characters.results[0].status}</span>
            </p>
            <p>
              <span className="title-label">Type:</span>
              <span className="value">{data.characters.results[0].type}</span>
            </p>
            <p>
              <span className="title-label">Location:</span>
              <span className="value"> {data.characters.results[0].location.name}</span>
            </p>
            <p>
              <span className="title-label">Origin:</span>
              <span className="value"> {data.characters.results[0].location.type}</span>
            </p>
            <p>
              <span className="title-label">Dimension:</span>
              <span className="value"> {data.characters.results[0].location.dimension}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

Buscar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Buscar;
