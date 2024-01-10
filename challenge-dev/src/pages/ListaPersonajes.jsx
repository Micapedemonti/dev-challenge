import  { useState } from "react";
import usePersonajes from '../hooks/usePersonajes';
import './ListaPersonajes.css';
import { Link } from 'react-router-dom';
import Buscar from './Buscar';

const ListaPersonajes = () => {
  const { error, loading, data } = usePersonajes();
  const [nombreBuscado, setNombreBuscado] = useState(""); 

  if (loading) return <div>Cargando...</div>;

  if (error) return <div>Algo salió mal...</div>;

  const handleSearch = (name) => {
    setNombreBuscado(name);
  };

  return (
    <div>
      <Buscar onSearch={handleSearch} />
      {!nombreBuscado && (
        <div className="listaPersonajes">
          {data.characters.results.map((character) => (
            <Link to={`/${character.id}`} key={character.id} className="personaje-item">
              <img className="personaje-img" src={character.image} alt={character.name} />
              <h2 className="personaje-nombre"> {character.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaPersonajes;