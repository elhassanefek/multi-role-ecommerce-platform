import { useStore } from "../../contexts/StoreContext";
function CategoryFilter() {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  return (
    <div>
      <label htmlFor="category-select">Categories</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
