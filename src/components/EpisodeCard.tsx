import { Link } from 'react-router-dom';
import { useEpisodeStore } from '../store/useEpisodeStore';
import { motion } from 'framer-motion';

type Props = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  charactersCount: number;
};

export const EpisodeCard = ({ id, name, episode, air_date, charactersCount }: Props) => {
  const { favorites, watched, toggleFavorite, toggleWatched } = useEpisodeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="card bg-base-100 shadow-xl mb-4"
    >
      <div className="card-body">
        <Link to={`/episode/${id}`}>
          <h2 className="card-title hover:underline">{episode} - {name} ➡️ </h2>
        </Link>
        <p>Air Date: {air_date}</p>
        <p>Characters: {charactersCount}</p>
        <div className="card-actions justify-end">
          <motion.button 
            className="btn btn-sm" 
            onClick={() => toggleFavorite(id)}
            whileTap={{ scale: 0.95 }}
          >
            {favorites.includes(id) ? '💔 Desfavoritar' : '❤️ Favoritar'}
          </motion.button>
          <motion.button 
            className="btn btn-sm" 
            onClick={() => toggleWatched(id)}
            whileTap={{ scale: 0.95 }}
          >
            {watched.includes(id) ? '👁️ Visto' : '👁️‍🗨️ Marcar como visto'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};