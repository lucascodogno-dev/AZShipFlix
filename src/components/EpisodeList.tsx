import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Episode {
  id: string;
  name: string;
  episode: string;
  air_date: string;
}

export const EpisodeList = ({ episodes }: { episodes: Episode[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {episodes.map((ep) => (
        <motion.div
          key={ep.id}
          whileHover={{ scale: 1.02 }}
          className="bg-base-200 p-3 rounded-lg hover:bg-base-300 transition-colors"
        >
          <Link to={`/episode/${ep.id}`} className="block">
            <h4 className="font-medium">{ep.episode} - {ep.name}</h4>
            <p className="text-sm text-gray-500">Exibido em: {ep.air_date}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};