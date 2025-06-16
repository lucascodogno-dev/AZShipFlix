import { useEpisodeStore } from "../store/useEpisodeStore";
import { useQuery } from "@apollo/client";
import { GET_ALL_EPISODES } from "../graphql/queries";
import { EpisodeCard } from "../components/EpisodeCard";
import { motion } from "framer-motion";
import emptyFavorites from "../assets/empty-favorites.png"; // ✅ Importando a imagem

export const Favorites = () => {
  const { favorites } = useEpisodeStore();
  const { data, loading } = useQuery(GET_ALL_EPISODES);

  if (loading) return <p className="p-4">Carregando favoritos...</p>;

  const episodes = data.episodes.results.filter((ep: any) =>
    favorites.includes(ep.id)
  );

  if (episodes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-8 space-y-4"
      >
        <img
          src={emptyFavorites}
          alt="Nenhum favorito"
          className="w-64 h-64 object-contain"
        />
        <p className="text-xl font-medium text-gray-500">
          Nenhum episódio favoritado ainda.
        </p>
        <a
          href="/"
          className="btn btn-primary mt-4"
        >
          🔙 Voltar para Início
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="p-4 max-w-7xl mx-auto"
      
    >
       <a
          href="/"
          className="btn btn-primary mt-4 mb-7"
        >
          🔙 Voltar para Início
        </a>
      <h1 className="text-3xl font-bold mb-4">❤️ Episódios Favoritos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {episodes.map((ep: any) => (
          <EpisodeCard
            key={ep.id}
            id={ep.id}
            name={ep.name}
            episode={ep.episode}
            air_date={ep.air_date}
            charactersCount={ep.characters.length}
          />
        ))}
      </div>
    </motion.div>
  );
};
