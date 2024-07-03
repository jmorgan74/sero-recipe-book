import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="form-group">
        <label htmlFor="recipe-search">Search Recipes</label>
        <input type="text" id="recipe-search" name="recipe-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required />
    </div>
  );
};

export default SearchBar;
