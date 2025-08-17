import { createContext, useContext, useEffect, useReducer } from "react";

const StoreContext = createContext();

const InitialState = {
  categories: [],
  selectedCategory: "",
  isloading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isloading: true };

    case "categories/loaded":
      return { ...state, isloading: false, categories: action.payload };

    case "category/loaded":
      return { ...state, selectedCategory: action.payload };

    case "rejected":
      return { ...state, isloading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

const BASE_URL = "http://localhost:9000";

function StoreProvider({ children }) {
  const [{ isloading, categories, selectedCategory, error }, dispatch] =
    useReducer(reducer, InitialState);

  useEffect(() => {
    async function fetchCategories() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/categories`);
        const data = await res.json();

        dispatch({
          type: "categories/loaded",
          payload: data,
        });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Error fetching product categories...",
        });
      }
    }

    fetchCategories();
  }, []);

  function setSelectedCategory(category) {
    dispatch({ type: "category/loaded", payload: category });
  }

  return (
    <StoreContext.Provider
      value={{
        categories,
        isloading,
        error,
        selectedCategory,
        setSelectedCategory,
        BASE_URL,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined)
    throw new Error("useStore must be used within a StoreProvider");
  return context;
}

export { StoreProvider, useStore };
