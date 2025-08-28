import { useStore } from "../../contexts/StoreContext";
function CategoryFilter() {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  return (
    <div>
      <label htmlFor="category-select" className="text-gray-700 font-medium">
        Categories
      </label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="text-gray-700 font-medium"
      >
        <option value="" className="text-gray-700 font-medium">
          All Categories
        </option>
        {categories.map((cat) => (
          <option
            key={cat.id}
            value={cat.name}
            className="text-gray-700 font-medium"
          >
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
