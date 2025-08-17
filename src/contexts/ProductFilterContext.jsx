import { createContext, useContext, useState } from "react";

const ProductFilterContext = createContext();

export function ProductFilterProvider({ children }) {
  const [filters, setFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addFilter = (filter) => {
    setFilters((prev) => {
      if (prev.some((f) => f.field === filter.field)) return prev;
      return [...prev, filter];
    });
  };

  const removeFilter = (field) => {
    setFilters((prev) => prev.filter((f) => f.field !== field));
  };

  const clearFilters = () => {
    setFilters([]);
    setSearchTerm("");
  };

  // Check if there are active filters
  const hasActiveFilters = () => {
    const hasFilters = filters.some((filter) => {
      if (typeof filter.value === "string") {
        return filter.value.trim() !== "";
      }
      if (typeof filter.value === "object") {
        return Object.values(filter.value).some(
          (val) => val && val.toString().trim() !== ""
        );
      }
      return filter.value != null && filter.value !== "";
    });

    return hasFilters || searchTerm.trim() !== "";
  };

  // Get count of active filters for UI badge
  const getActiveFilterCount = () => {
    const filterCount = filters.filter((filter) => {
      if (typeof filter.value === "string") {
        return filter.value.trim() !== "";
      }
      if (typeof filter.value === "object") {
        return Object.values(filter.value).some(
          (val) => val && val.toString().trim() !== ""
        );
      }
      return filter.value != null && filter.value !== "";
    }).length;

    return filterCount + (searchTerm.trim() ? 1 : 0);
  };

  return (
    <ProductFilterContext.Provider
      value={{
        filters,
        addFilter,
        removeFilter,
        clearFilters,
        setFilters,
        searchTerm,
        setSearchTerm,
        hasActiveFilters,
        getActiveFilterCount,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}

export const useProductFilter = () => useContext(ProductFilterContext);
