import { gql } from '@apollo/client';

// Buscar todos Epsódios
export const GET_ALL_EPISODES = gql`
  query {
    episodes {
      results {
        id
        name
        episode
        air_date
        characters {
          id
          image
        }
      }
    }
  }
`;

// Buscar Episódios Favoritos por ID
export const GET_EPISODE_BY_ID = gql`
  query GetEpisodeById($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        image
        species
        status
        gender
      }
    }
  }
`;
// Buscar Detalhes do Personagem por ID
export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        url
      }
      location {
        name
        url
      }
      image
      episode {
        id
        name
        episode
        air_date
      }
      created
    }
  }
`; 

// Buscar Personagens com Filtros e Paginação
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          name
        }
        location {
          name
        }
        episode {
          id
        }
      }
    }
  }
`;

