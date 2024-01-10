import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_PERSONAJE = gql`
  query GetPersonaje($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      status
      gender
      location {
        id
        name
        type
        dimension
      }
    }
  }
`;

export const usePersonaje = (id) => {
  const { data, error, loading } = useQuery(GET_PERSONAJE, {
    variables: {
      id,
    },
  });

  return {
    personaje: data?.character || null,
    error,
    loading,
  };
};
