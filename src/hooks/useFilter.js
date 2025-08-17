export function useFilter() {
  function filterProducts(products, querry, category) {
    return products.filter((p) => {
      const matchQuery = p.name.toLowerCase().includes(querry.toLowerCase());
      const matchCategory =
        !category || category === "" || p.category === category;
      return matchCategory && matchQuery;
    });
  }

  return { filterProducts };
}
