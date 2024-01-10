import { Link, useParams } from 'react-router-dom';
import { usePersonaje } from '../hooks/usePersonaje';
import './Personaje.css';

const Personaje = () => {
  const { id } = useParams();
  const { personaje, loading, error } = usePersonaje(id);

  if (error) return <div>Algo ha salido mal..</div>;
  if (loading) return <div>Cargando..</div>;

  return (
    <div className="personaje">
      <img src={personaje.image} width={300} height={300} />
      <div className="Personaje-content">
        <h1>
          <span className="name">{personaje.name}</span>
        </h1>
        <p>
          <span className="title-label">Gender:</span>
          <span className="value">{personaje.gender}</span>
        </p>
        <p>
          <span className="title-label">Species:</span>
          <span className="value">{personaje.species}</span>
        </p>
        <p>
          <span className="title-label">Status:</span>
          <span className="value">{personaje.status}</span>
        </p>
        <p>
          <span className="title-label">Type:</span>
          <span className="value">{personaje.type}</span>
        </p>
        <Link to="/" style={{color:"white"}}>Volver a Inicio</Link>
      </div>
    </div>
  );
};

export default Personaje;
