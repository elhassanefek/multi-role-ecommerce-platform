import { useRef } from "react";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background-color: var(--color-grey-50);
  border-radius: 0.8rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;

  &:focus-within {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }
`;
const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.4rem;
  outline: none;
  color: var(--color-text);

  &::placeholder {
    color: var(--color-grey-400);
  }
`;
function Search({ query, setQuery, elements }) {
  const inputEl = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      inputEl.current.blur();
    }
  };

  return (
    <StyledSearchBar>
      <SearchInput
        type="text"
        placeholder={`search ${elements}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
        onKeyDown={handleKeyDown}
      />
    </StyledSearchBar>
  );
}

export default Search;
