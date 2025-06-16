import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODE_BY_ID } from "../graphql/queries";
import { CharacterCardSkeleton } from "../components/CharacterCardSkeleton";
import { motion } from "framer-motion";

export const EpisodeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_EPISODE_BY_ID, {
    variables: { id },
  });

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4"
      >
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <CharacterCardSkeleton key={i} />
          ))}
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-red-500"
      >
        Erro ao carregar episódio.
      </motion.div>
    );

  const episode = data.episode;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="p-4 max-w-7xl mx-auto"
    >
      <Link to="/" className="inline-flex items-center gap-2 btn btn-sm mb-4 hover:gap-3 transition-all">
        <span>⬅</span>
        <span>Voltar</span>
      </Link>
      
      <div className="bg-base-200 p-6 rounded-lg mb-8 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {episode.episode} - {episode.name}
        </h1>
        <p className="text-lg text-gray-500 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Data de exibição: {episode.air_date}
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Personagens ({episode.characters.length})
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {episode.characters.map((char: any) => (
          <motion.div
            key={char.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <figure className="relative">
              <img 
                src={char.image} 
                alt={char.name} 
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              {char.status !== 'Alive' && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  {char.status === 'Dead' && (
                    <span className="text-white text-xl font-bold">✝</span>
                  )}
                </div>
              )}
            </figure>
            <div className="card-body p-4">
              <h3 className="card-title text-lg truncate" title={char.name}>
                {char.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  char.status === 'Alive' ? 'bg-green-500' : 
                  char.status === 'Dead' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></span>
                {char.status} - {char.species}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge badge-outline flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {char.gender}
                </span>
                {char.type && (
                  <span className="badge badge-outline">
                    {char.type}
                  </span>
                )}
              </div>                          
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};