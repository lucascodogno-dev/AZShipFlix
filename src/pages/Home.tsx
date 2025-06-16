import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_EPISODES } from "../graphql/queries";
import { EpisodeCard } from "../components/EpisodeCard";
import { EpisodeCardSkeleton } from "../components/EpisodeCardSkeleton";
import { SearchInput } from "../components/SearchInput";
import { motion } from "framer-motion";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_EPISODES);

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4"
      >
        <h1 className="text-3xl font-bold mb-4">
          📺 Episódios de Rick and Morty
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <EpisodeCardSkeleton key={i} />
          ))}
        </div>
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4"
      >
        <p>Error loading episodes</p>
      </motion.div>
    );

  const filteredEpisodes = data.episodes.results.filter(
    (ep: any) =>
      ep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.episode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="p-4 max-w-9xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          📺 Episódios de Rick and Morty
        </h1>
        <div className="w-full md:w-auto min-w-[250px]">
          <SearchInput onSearch={setSearchTerm} />
        </div>
      </div>

      {filteredEpisodes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-xl text-gray-500">
            Nenhum episódio encontrado para "{searchTerm}"
          </p>
        </motion.div>
      ) : (
        <div className="space-y-10">
          {Object.entries(
            filteredEpisodes.reduce((acc: Record<string, any[]>, ep: any) => {
              const seasonMatch = ep.episode.match(/^S(\d{2})/);
              const season = seasonMatch
                ? `Temporada ${parseInt(seasonMatch[1])}`
                : "Outros";
              acc[season] = acc[season] || [];
              acc[season].push(ep);
              return acc;
            }, {})
          )
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([seasonTitle, episodes]) => {
              const eps = episodes as any[];
              return (
                <div key={seasonTitle} className="season-section">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center mb-6"
                  >
                    <div className="w-2 h-8 bg-emerald-500 rounded-full mr-3"></div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {seasonTitle}
                      <span className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">
                        ({eps.length} episódio{eps.length !== 1 ? "s" : ""})
                      </span>
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.05 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {eps.map((ep: any) => (
                      <EpisodeCard
                        key={ep.id}
                        id={ep.id}
                        name={ep.name}
                        episode={ep.episode}
                        air_date={ep.air_date}
                        charactersCount={ep.characters.length}
                      />
                    ))}
                  </motion.div>
                </div>
              );
            })}
        </div>
      )}
    </motion.div>
  );
};
