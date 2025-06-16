import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const CharacterList = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: '', species: '', gender: '' });

  const { data, loading } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      filter: {
        name: search,
        ...filters,
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 max-w-7xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-4">
        🧑‍🚀 Personagens ({data?.characters?.info?.count ?? 0})
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar por nome"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="input input-bordered w-full md:w-1/3"
        />
        <select name="status" className="select select-bordered" onChange={handleChange}>
          <option value="">Status</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Morto</option>
          <option value="unknown">Desconhecido</option>
        </select>
        <select name="gender" className="select select-bordered" onChange={handleChange}>
          <option value="">Gênero</option>
          <option value="Male">Masculino</option>
          <option value="Female">Feminino</option>
          <option value="Genderless">Sem Gênero</option>
          <option value="unknown">Desconhecido</option>
        </select>
      </div>

      {loading ? (
        <p>Carregando personagens...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.characters?.results?.map((char: any) => (
              <div key={char.id} className="card bg-base-100 shadow-md overflow-hidden">
                <figure>
                  <img src={char.image} alt={char.name} className="w-full h-64 object-cover" />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-lg">{char.name}</h2>
                  <p>🧬 Espécie: {char.species}</p>
                  {char.type && <p>🧪 Tipo: {char.type}</p>}
                  <p>❤️ Status: {char.status}</p>
                  <p>⚥ Gênero: {char.gender}</p>
                  <p>🌍 Origem: {char.origin.name}</p>
                  <p>📍 Localização: {char.location.name}</p>
                  <p>🎬 Episódios: {char.episode?.length ?? 0}</p>
                </div>
              </div>
            ))}
          </div>

          {data?.characters?.info && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                className="btn btn-outline"
                disabled={!data.characters.info.prev}
                onClick={() => setPage((p) => p - 1)}
              >
                ⬅ Anterior
              </button>
              <span className="text-sm self-center">Página {page}</span>
              <button
                className="btn btn-outline"
                disabled={!data.characters.info.next}
                onClick={() => setPage((p) => p + 1)}
              >
                Próxima ➡
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};
