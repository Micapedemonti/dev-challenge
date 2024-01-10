import { useQuery, gql } from "@apollo/client";


const GET_PERSONAJES = gql `
  query {
    characters {
      results {
        id
        name
        image
        type
        species
        status
        gender
      }
    }
  }
`;

const usePersonajes =() =>{
    const { error, data, loading } = useQuery(GET_PERSONAJES);

    return {
        error,
        data,
        loading
    };
};

export default usePersonajes
