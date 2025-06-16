import { useEffect, useState } from 'react';

interface Props {
  onSearch: (term: string) => void;
}

export const SearchInput = ({ onSearch }: Props) => {
  const [term, setTerm] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(term);
    }, 500);
    return () => clearTimeout(timeout);
  }, [term, onSearch]);

  return (
    <input
      type="text"
      placeholder="🔎 Buscar episódio..."
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      className="input input-bordered w-full max-w-md mb-4"
    />
  );
};
