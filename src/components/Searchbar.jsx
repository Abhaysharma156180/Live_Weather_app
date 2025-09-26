import React from "react";

export default function Searchbar({ city, setCity, onSearch, onSearchEnter }) {
  return (
    <div className="searchbar">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearchEnter && onSearchEnter(city);
        }}
        placeholder="Search city (e.g., London) or allow location..."
        aria-label="Search city"
      />
      <button type="button" onClick={onSearch}>Search</button>
    </div>
  );
}
