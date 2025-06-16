import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import notFoundImage from "../assets/not-found.png";

export const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[70vh] p-6 space-y-6"
    >
      <img
        src={notFoundImage}
        alt="Página não encontrada"
        className="w-72 h-72 object-contain"
      />
      <h1 className="text-3xl font-bold text-center">Oops! Página não encontrada</h1>
      <p className="text-gray-500 text-center max-w-md">
        Parece que você viajou para uma dimensão que ainda não existe. Volte para o portal de entrada!
      </p>
      <Link to="/" className="btn btn-primary mt-4">
        🔙 Voltar para Início
      </Link>
    </motion.div>
  );
};
