import { useRef } from "react";

function Search({ query, setQuery, elements }) {
  const inputEl = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      inputEl.current.blur();
    }
  };

  return (
    <input
      type="text"
      placeholder={`search ${elements}...`}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
      onKeyDown={handleKeyDown}
    />
  );
}

export default Search;
